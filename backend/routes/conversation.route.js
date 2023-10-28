const express = require('express');
const uploadGroupAvatar = require('../StorageEngine/GroupMulter')

const {
  createConversation,
  getConversationById,
  sendMessage,
  getConversationsByUser,
  markAllAsRead,
  clearChat,
  deleteChat,
  createGroupConversation,
  setgroupProfile,
  getgroupProfile,
} = require('../controllers/conversation.controller');

const router = express.Router();

router.get('/getgroupavatar/:id', getgroupProfile);
router.post('/conversations/create', createConversation);
router.post('/conversations/createGroup', createGroupConversation);
router.get('/conversations/:conversationId', getConversationById);
router.post('/conversations/:conversationId/messages', sendMessage);
router.get('/user/:userId/conversations', getConversationsByUser);
router.post('/conversation/:conversationId/markread', markAllAsRead)
router.put('/conversation/:conversationId/clear', clearChat)
router.delete('/conversation/:conversationId/delete', deleteChat)
router.put('/updategroupavatar/:id', uploadGroupAvatar, setgroupProfile);


module.exports= router;
