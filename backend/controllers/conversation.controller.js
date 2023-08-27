import Conversation from '../models/conversation.model';

export const createConversation = async (req, res) => {
  try {
    const { members, group, groupName } = req.body;
    const conversation = new Conversation({
      members,
      group,
      groupName,
    });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: 'Could not create conversation.' });
  }
};

export const getConversationById = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const conversation = await Conversation.findById(conversationId);
    res.json(conversation);
  } catch (error) {
    res.status(404).json({ error: 'Conversation not found.' });
  }
};

export const sendMessage = async (req, res) => {
  const { conversationId } = req.params;
  const { sender, content } = req.body;
  try {
    const conversation = await Conversation.findById(conversationId);
    conversation.messages.push({ sender, content });
    conversation.lastMessage = conversation.messages[conversation.messages.length - 1];
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: 'Could not send message.' });
  }
};

export const getConversationsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversations = await Conversation.find({ members: userId });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve conversations.' });
  }
};
