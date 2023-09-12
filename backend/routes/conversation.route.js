const express = require('express');

const {
  createConversation,
  getConversationById,
  sendMessage,
  getConversationsByUser,
  markAllAsRead,
} = require('../controllers/conversation.controller');

const router = express.Router();

router.post('/conversations/create', createConversation);
router.get('/conversations/:conversationId', getConversationById);
router.post('/conversations/:conversationId/messages', sendMessage);
router.get('/user/:userId/conversations', getConversationsByUser);
router.post('/conversation/:conversationId/markread', markAllAsRead)
module.exports= router;
