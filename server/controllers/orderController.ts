import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "../config/db.js";
import { inngest } from "../inngest/index.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// =========================
// CREATE ORDER
// POST /api/orders
// =========================
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    // Validate payment method
    if (!["cash", "card"].includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method",
      });
    }

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "No order items",
      });
    }

    // Get product ids
    const productIds = items.map((item: any) => item.product);

    // Fetch products
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    // Map products
    const productMap = new Map(
      products.map((product) => [product.id, product])
    );

    // Validate stock
    for (const item of items) {
      const product = productMap.get(item.product);

      if (!product) {
        return res.status(404).json({
          message: `Product ${item.product} not found`,
        });
      }

      if ((product.stock ?? 0) < item.quantity) {
        return res.status(400).json({
          message: `${product.name} is out of stock`,
        });
      }
    }

    // Prepare order items
    const orderItems = items.map((item: any) => {
      const product = productMap.get(item.product)!;

      return {
        product: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
        unit: product.unit,
      };
    });

    // Totals
    const subtotal = orderItems.reduce(
      (sum: number, item: any) =>
        sum + item.price * item.quantity,
      0
    );

    const deliveryFee = subtotal > 20 ? 0 : 1.99;

    const tax = Math.round(subtotal * 0.08 * 100) / 100;

    const total =
      Math.round((subtotal + deliveryFee + tax) * 100) / 100;

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: req.user!.id,

        items: orderItems,

        shippingAddress,

        paymentMethod,

        subtotal,

        deliveryFee,

        tax,

        total,

        isPaid: paymentMethod === "cash",

        statusHistory: [
          {
            status: "Placed",
            note: "Order placed successfully",
            timestamp: new Date(),
          },
        ],
      },
    });

    // =============================
    // CARD PAYMENT
    // =============================
    if (paymentMethod === "card") {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",

        success_url: `${req.headers.origin}/orders?clearCart=true&session_id={CHECKOUT_SESSION_ID}`,

        cancel_url: `${req.headers.origin}/checkout`,

        payment_method_types: ["card"],

        metadata: {
          orderId: order.id,
        },

        line_items: [
          {
            quantity: 1,

            price_data: {
              currency: "inr",

              unit_amount: Math.round(total * 100),

              product_data: {
                name: "Cartify Grocery Order",
              },
            },
          },
        ],
      });

      if (!session.url) {
        return res.status(500).json({
          message: "Unable to create Stripe Checkout session",
        });
      }

      return res.json({
        url: session.url,
      });
    }

    // =============================
    // CASH ORDER
    // =============================

    // Reduce stock immediately
    for (const item of orderItems) {
      await prisma.product.update({
        where: {
          id: item.product,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Inventory events
    for (const item of orderItems) {
      await inngest.send({
        name: "inventory/stock.updated",
        data: {
          productId: item.product,
        },
      });
    }

    await inngest.send({
      name: "order/placed",
      data: {
        orderId: order.id,
      },
    });

    return res.json({
      order,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: error.message || "Failed to create order",
    });
  }
};

// =========================
// GET USER ORDERS
// GET /api/orders
// =========================
export const getUserOrders = async (
  req: Request,
  res: Response
) => {
  try {
    const { status } = req.query;

    const where: any = {
      userId: req.user!.id,
    };

    if (status && status !== "all") {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        deliveryPartner: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({ orders });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// GET SINGLE ORDER
// GET /api/orders/:id
// =========================
export const getOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id,
      },
      include: {
        deliveryPartner: {
          select: {
            name: true,
            phone: true,
            avatar: true,
            vehicleType: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.json({ order });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// UPDATE ORDER STATUS
// PUT /api/orders/:id/status
// =========================
export const updateOrderStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { status, note } = req.body;

    const order = await prisma.order.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const history = Array.isArray(order.statusHistory)
      ? [...(order.statusHistory as any[])]
      : [];

    history.push({
      status,
      note: note || `Order ${status.toLowerCase()}`,
      timestamp: new Date(),
    });

    const updatedOrder = await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status,
        statusHistory: history,
      },
    });

    return res.json({
      order: updatedOrder,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// ADMIN - GET ALL ORDERS
// GET /api/orders/all
// =========================
export const getAllOrders = async (
  req: Request,
  res: Response
) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        deliveryPartner: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      orders,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// GET LIVE ORDER LOCATION
// GET /api/orders/:id/location
// =========================
export const getOrderLocation = async (
  req: Request,
  res: Response
) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id,
      },
      select: {
        liveLocation: true,
        status: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.json({
      liveLocation: order.liveLocation,
      status: order.status,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};