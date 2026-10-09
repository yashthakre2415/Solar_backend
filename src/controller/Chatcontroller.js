const {getchatuser,getchathistory,createChatMessage,createAlert, deleteChatMessage} = require("../models/Chatmodel");

const Chatcontroller = (req, res) => {
    try {
        getchatuser((err, result) => {
            if (err) {
                console.log('Fetching user info ', err);
                return res.status(500).json({
                    message: 'Fetching user info',
                    success: false
                });
            }

            return res.status(200).json({
                message: 'Fetching user info successfully',
                success: true,
                user: result
            });
        });
    } catch (err) {
        console.log('Internal server error', err);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const Getchatcontroller = (req, res) => {
    try {
        const { room, type } = req.query;
        if (!room) {
            return res.status(400).json({
                message: 'Room is required',
                success: false
            });
        }
        getchathistory(room, type, (err, result) => {
            if (err) {
                console.log('Get chat history error', err);
                return res.status(500).json({
                    message: 'Failed to fetch chat history',
                    success: false
                });
            }
            return res.status(200).json({
                message: 'Chat history fetched successfully',
                success: true,
                chat: result
            });
        });
    } catch (err) {
        console.log('Internal server error', err);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const ChatMessageController = (req, res) => {
    try {
        const {sender_id,receiver_id,room,type,message,imageUrl} = req.body;
        if (!sender_id || !room) {
            return res.status(400).json({
                message: 'Sender ID and room are required',
                success: false
            });
        }
        if (!message && !imageUrl) {
            return res.status(400).json({
                message: 'Message or image URL is required',
                success: false
            });
        }
        const data = {sender_id,receiver_id: receiver_id || null,room,type: type || (imageUrl ? 'image' : 'text'),message: message || null,imageUrl: imageUrl || null};
        createChatMessage(data, (err, result) => {
            if (err) {
                console.log('Saving chat message failed', err);
                return res.status(500).json({
                    message: 'Failed to save chat message',
                    success: false
                });
            }
            return res.status(201).json({
                message: 'Chat message saved successfully',
                success: true,
                chatMessage: {
                    id: result.insertId,
                    ...data
                }
            });
        });
    } catch (err) {
        console.log('Internal server error', err);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const AlertAllController = (req, res) => {
    try {
        const { title, message } = req.body;

        if (!title || !message) {
            return res.status(400).json({
                success: false,
                message: 'Title and message are required'
            });
        }

        createAlert(title, message, (err, result) => {
            if (err) {
                console.log('Alert creation failed', err);

                return res.status(500).json({
                    success: false,
                    message: 'Failed to create alert'
                });
            }

            return res.status(201).json({
                success: true,
                message: 'Alert created successfully',
                alertId: result.insertId
            });
        });
    } catch (err) {
        console.log('Internal server error', err);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


const DeleteMessageController = (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Valid message ID is required'
            });
        }

        deleteChatMessage(id, (err, result) => {
            if (err) {
                console.log('Delete message failed', err);

                return res.status(500).json({
                    success: false,
                    message: 'Failed to delete message'
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Chat message not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Chat message deleted successfully'
            });
        });
    } catch (err) {
        console.log('Internal server error', err);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
module.exports = {Chatcontroller,Getchatcontroller,ChatMessageController,AlertAllController,DeleteMessageController};

