import express from 'express'
import { getChatMessages, sendMessage, sseController } from '../controllers/messageController.js'
import { upload } from '../configs/multer.js'
import { protect } from '../middlewares/auth.js'

const messageRouter = express.Router()

messageRouter.post('/get',protect,getChatMessages)
messageRouter.post('/send',upload.single('image'),protect,sendMessage)
messageRouter.get('/:userId',sseController)

export default messageRouter
