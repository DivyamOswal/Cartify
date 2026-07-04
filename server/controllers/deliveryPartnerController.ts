import { Request, Response } from "express";
import { prisma } from "../config/db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateToken = (id: string)=>{
    return jwt.sign({id, role: "delivery"}, process.env.JWT_SECRET as string, {expiresIn: "30d"})
}

//  Partner Login
export const loginPartner = async (req: Request, res: Response)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message: "Please provide email and password"})
    }

    const partner = await prisma.deliveryPartner.findUnique({where: {email: email.toLowerCase()}})

    if(!partner){
        return res.status(401).json({message: "Invalid email or password"})
    }

    if(!partner.isActive){
        return res.status(403).json({message: "Your account has been deactivated"})
    }

    const isMatch = await bcrypt.compare(password, partner.password)
    if(!isMatch){
        return res.status(401).json({message: "Invalid email or password"})
    }

    const token = generateToken(partner.id)
    const {password: _, ...partnerData} = partner

    res.json({partner: partnerData, token})
}

// Get assigned deliveries GET ( /api/delivery/my-deliveries )
export const getDeliveries = async (req: Request, res: Response)=>{
    const {status} = req.body
    const where: any = {deliveryPartnerId: req.partner!.id}

    if(status === "active"){
        where.status = {in : ["Assigned", "Packed", "Out for Delivery"]}
    }else if(status === "completed"){
        where.status = {in: ["Delivered", "Cancelled"]}
    }

    const orders = await prisma.order.findMany({
        where, include: {user: {select: {name: true, email: true, phone: true}}},
        orderBy: {createdAt: "desc"}
    })
    res.json({orders})
}

// Get single delivery detail GET ( /api/delivery/my-deliveries/:id )
export const getDeliveryDetail = async (req: Request, res: Response)=>{
    const order = await prisma.order.findFirst({
        where: {id: req.params.id as string, deliveryPartnerId: req.partner!.id},
        include: {user: {select: {name: true, email: true, phone: true}}}
    })
    if(!order){
        return res.status(404).json({message: "Delivery not found"})
    }
    res.json({order})
}

// Complete delivery with OTP PUT ( /api/delivery/my-deliveries/:id/complete )
export const completeDelivery = async (req: Request, res: Response)=>{
    const {otp} = req.body
    const order = await prisma.order.findFirst({
        where: {id: req.params.id as string, deliveryPartnerId: req.partner!.id}
    })
    if(!order || order.status === "Cancelled" || order.status === "Delivered"){
        return res.status(400).json({message: "Invalid Request"})
    }
    if(order.deliveryOtp !== otp){
        return res.status(500).json({message: "Invalid OTP"})
    }

    const history = order.statusHistory as any[]

    history.push({status: 'Delivered', note: "Delivered by partner", timestamp: new Date()})

    const updatedOrder = await prisma.order.update({
        where: {id: order.id}, 
        data: {status: 'Delivered', statusHistory: history, deliveryOtp: ""}
    })
    res.json({order: updatedOrder, message:'Delivery completed succesfully'})
}

