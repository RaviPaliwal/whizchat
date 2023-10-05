const express = require('express');

const {
  createConversation,
  getConversationById,
  sendMessage,
  getConversationsByUser,
  markAllAsRead,
  clearChat,
  deleteChat,
} = require('../controllers/conversation.controller');

const router = express.Router();

router.post('/conversations/create', createConversation);
router.get('/conversations/:conversationId', getConversationById);
router.post('/conversations/:conversationId/messages', sendMessage);
router.get('/user/:userId/conversations', getConversationsByUser);
router.post('/conversation/:conversationId/markread', markAllAsRead)
router.put('/conversation/:conversationId/clear', clearChat)
router.delete('/conversation/:conversationId/delete', deleteChat)

module.exports= router;
