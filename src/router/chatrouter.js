const express = require('express');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const { Chatcontroller, Getchatcontroller, ChatMessageController, AlertAllController, DeleteMessageController } = require('../controller/Chatcontroller');
const chatrouter = express.Router();

chatrouter.get('/user-info',authMiddleware,Chatcontroller);
chatrouter.get('/user-chat/history',authMiddleware,Getchatcontroller);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' +
            file.originalname.replace(/\s+/g, '-');

        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

chatrouter.post('/chat-upload-image',authMiddleware,upload.single('image'),(req, res) => {
        if (!req.file) {
            return res.status(400).json({
                message: 'Image file is required',
                success: false
            });
        }
        return res.status(200).json({
            message: 'Chat image uploaded successfully',
            success: true,
            imageUrl: `/uploads/${req.file.filename}`
        });
    }
);

chatrouter.post('/chat-message',authMiddleware,ChatMessageController);
chatrouter.post('/alert-all',authMiddleware,AlertAllController);
chatrouter.delete('/messages/:id',authMiddleware,DeleteMessageController);


module.exports = chatrouter;