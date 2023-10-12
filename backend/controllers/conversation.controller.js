const Conversation = require("../models/conversation.model");

exports.createConversation = async (req, res) => {
  try {
    const { members, group,} = req.body;

    // Ensure uniqueness of members (irrespective of order)
    const uniqueMembers = [...new Set(members)];

    if (uniqueMembers.length !== members.length) {
      return res
        .status(400)
        .json({ error: "Duplicate member IDs in the conversation." });
    }

    // Sort the unique members before checking for existence
    const sortedMembers = uniqueMembers.sort();

    // Check if the same combination of members already exists
    const existingConversation = await Conversation.findOne({
      members: sortedMembers,
    });

    if (existingConversation) {
      return res
        .status(409)
        .json({ error: "Conversation with the same members already exists." });
    }

    const conversation = new Conversation({
      members: sortedMembers,
      group,
    });

    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create conversation." });
  }
};

exports.createGroupConversation = async (req, res) => {
  try {
    const { groupMembers, groupName, about,admins } = req.body;

    // Ensure uniqueness of group members (irrespective of order)
    const uniqueGroupMembers = [...new Set(groupMembers)];

    if (uniqueGroupMembers.length !== groupMembers.length) {
      return res
        .status(400)
        .json({ error: "Duplicate member IDs in the group conversation." });
    }

    // Sort the unique group members before checking for existence
    const sortedGroupMembers = uniqueGroupMembers.sort();

    // Check if a conversation with the same combination of group members already exists
    const existingGroupConversation = await Conversation.findOne({
      groupMembers: sortedGroupMembers,
      groupName: groupName,
    });

    if (existingGroupConversation) {
      return res
        .status(409)
        .json({
          message:"Duplicate conversation",
          error: "Group conversation with the same members already exists.",
        });
    }

    const groupConversation = new Conversation({
      groupMembers: sortedGroupMembers,
      group: true,
      groupName,
      about,
      admins:admins
    });

    await groupConversation.save();
    res.json({message: "Group Created Successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not create group conversation." });
  }
};

exports.getConversationById = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const conversation = await Conversation.findById(conversationId);
    res.json(conversation);
  } catch (error) {
    res.status(404).json({ error: "Conversation not found." });
  }
};

exports.sendMessage = async (req, res) => {
  const { conversationId } = req.params;
  const { sender, content } = req.body;
  try {
    const conversation = await Conversation.findById(conversationId);
    conversation.messages.push({ sender, content });
    conversation.lastMessage = content;
    conversation.unseenCount = conversation.unseenCount + 1;
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Could not send message." });
  }
};

exports.getConversationsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversations = await Conversation.find({
      $or: [{ groupMembers: userId }, { members: userId }],
    });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve conversations." });
  }
};

exports.markAllAsRead = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const conversation = await Conversation.findById(conversationId);
    conversation.unseenCount = 0;
    conversation.save();
    res.json({ success: true, messages: "Marked as Read" });
  } catch (error) {
    res.status(404).json({ error: "Conversation not found." });
  }
};

exports.clearChat = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const conversation = await Conversation.findById(conversationId);
    conversation.messages = [];
    conversation.lastMessage = "Send a message";
    conversation.save();
    res.json({ success: true, message: "Chat Cleared" });
  } catch (error) {
    res.status(404).json({ error: "Conversation not found." });
  }
};

exports.deleteChat = async (req, res) => {
  const { conversationId } = req.params;
  try {
    await Conversation.findOneAndDelete(conversationId);
    res.json({ success: true, message: "Chat Deleted" });
  } catch (error) {
    res.status(404).json({ error: "Conversation not found." });
  }
};
