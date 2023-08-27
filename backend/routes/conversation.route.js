import express from 'express';
import {
  createConversation,
  getConversationById,
  sendMessage,
  getConversationsByUser,
} from '../controllers/conversation.controller';

const router = express.Router();

router.post('/conversations', createConversation);
router.get('/conversations/:conversationId', getConversationById);
router.post('/conversations/:conversationId/messages', sendMessage);
router.get('/user/:userId/conversations', getConversationsByUser);

export default router;
