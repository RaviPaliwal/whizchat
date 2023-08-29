const express = require('express');

const {
  createConversation,
  getConversationById,
  sendMessage,
  getConversationsByUser,
} = require('../controllers/conversation.controller');

const router = express.Router();

router.post('/conversations/create', createConversation);
router.get('/conversations/:conversationId', getConversationById);
router.post('/conversations/:conversationId/messages', sendMessage);
router.get('/user/:userId/conversations', getConversationsByUser);

module.exports= router;
