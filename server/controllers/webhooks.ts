import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "../config/db.js";
import { inngest } from "../inngest/index.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const stripeWebhook = async (
  request: Request,
  response: Response
) => {
  const signature = request.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      signature,
      endpointSecret
    );
  } catch (err: any) {
    console.error(
      "⚠️ Webhook signature verification failed:",
      err.message
    );
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {

      case "payment_intent.succeeded": {

        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });

        if (sessions.data.length === 0) {
          return response.status(404).json({
            message: "Checkout session not found",
          });
        }

        const { orderId } = sessions.data[0].metadata as {
          orderId: string;
        };

        const paidOrder = await prisma.order.update({
          where: {
            id: orderId,
          },
          data: {
            isPaid: true,
          },
        });

        const orderItems = Array.isArray(paidOrder.items)
          ? (paidOrder.items as any[])
          : [];

        // Decrease stock
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

        await inngest.send({
          name: "order/placed",
          data: {
            orderId,
          },
        });

        for (const item of orderItems) {
          await inngest.send({
            name: "inventory/stock.updated",
            data: {
              productId: item.product,
            },
          });
        }

        break;
      }

      case "payment_intent.payment_failed":
      case "payment_intent.canceled": {

        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });

        if (sessions.data.length === 0) break;

        const { orderId } = sessions.data[0].metadata as {
          orderId: string;
        };

        await prisma.order.update({
          where: {
            id: orderId,
          },
          data: {
            status: "Payment Failed",
          },
        });

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return response.json({
      received: true,
    });

  } catch (err: any) {
    console.error(err);

    return response.status(500).json({
      message: err.message,
    });
  }
};