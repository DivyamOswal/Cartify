import express from 'express'
import { assignDeliveryPartner, createDeliveryPartner, getAdminStatus, getDeliveryPartners, updateDeliveryPartner } from '../controllers/adminController.js'
import admin from '../middleware/admin.js'
import auth from '../middleware/auth.js'

const adminRouter = express.Router()

adminRouter.get('/status', auth, admin, getAdminStatus)
adminRouter.get('/delivery-partners', auth, admin, getDeliveryPartners)
adminRouter.post('/delivery-partners', auth, admin, createDeliveryPartner)
adminRouter.put('/delivery-partners/:id', auth, admin, updateDeliveryPartner)
adminRouter.put('/orders/:id/assign', auth, admin, assignDeliveryPartner)

export default adminRouter