import { Request, Response } from "express";
import { prisma } from "../config/db.js";


// Get user addresses GET ( /api/addresses )
export const getAddresses = async (req: Request, res: Response) => {
    const addresses = await prisma.address.findMany({
        where: { userId: req.user!.id },
        orderBy: { createdAt: "asc" }
    })
    res.json({ addresses })
}

// Add address POST ( /api/addresses )
export const addAddress = async (req: Request, res: Response) => {
    const { label, address, city, state, zip, isDefault, lat, lng } = req.body

    // Require coordinates
    if (lat == null || lng == null) {
        return res.status(400).json({ message: "Location coordinates are required. Please allow location access." })
    }

    const currentAddresses = await prisma.address.findMany({
        where: { userId: req.user!.id }
    })

    let makeDefault = isDefault
    if (currentAddresses.length === 0) makeDefault = true

    if (makeDefault) {
        await prisma.address.updateMany({
            where: { userId: req.user!.id },
            data: { isDefault: false }
        })
    }

    await prisma.address.create({
        data: {
            userId: req.user!.id,
            label,
            address,
            city,
            state,
            zip,
            isDefault: makeDefault,
            lat: Number(lat),
            lng: Number(lng)
        }
    })

    const addresses = await prisma.address.findMany({
        where: { userId: req.user!.id },
        orderBy: { createdAt: "asc" }
    })
    res.status(201).json({ addresses })
}

// Update address PUT ( /api/addresses/:id )
export const updateAddress = async (req: Request, res: Response) => {
    const { label, address, city, state, zip, isDefault, lat, lng } = req.body

    // Require coordinates
    if (lat == null || lng == null) {
        return res.status(400).json({ message: "Location coordinates are required. Please allow location access." })
    }

    const data: any = {}
    if (label) data.label = label;
    if (address) data.address = address;
    if (city) data.city = city;
    if (state) data.state = state;
    if (zip) data.zip = zip;
    if (isDefault !== undefined) data.isDefault = isDefault;
    if (lat != null) data.lat = Number(lat);
    if (lng != null) data.lng = Number(lng);

    // If this address is being set as default, unset any other default first
    if (data.isDefault === true) {
        await prisma.address.updateMany({
            where: { userId: req.user!.id },
            data: { isDefault: false }
        })
    }

    const result = await prisma.address.updateMany({
        where: {
            id: req.params.id as string,
            userId: req.user!.id
        },
        data
    })

    if (result.count === 0) {
        return res.status(404).json({ message: "Address not found" })
    }

    const addresses = await prisma.address.findMany({
        where: { userId: req.user!.id },
        orderBy: { createdAt: "asc" }
    })
    res.json({ addresses })
}

// Delete address DELETE ( /api/addresses/:id )
export const deleteAddress = async (req: Request, res: Response) => {
    const result = await prisma.address.deleteMany({
        where: {
            id: req.params.id as string,
            userId: req.user!.id
        }
    })

    if (result.count === 0) {
        return res.status(404).json({ message: "Address not found" })
    }

    const addresses = await prisma.address.findMany({
        where: { userId: req.user!.id },
        orderBy: { createdAt: "asc" }
    })

    res.json({ addresses })
}