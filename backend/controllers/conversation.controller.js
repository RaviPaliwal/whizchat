const Conversation = require('../models/conversation.model');

// exports.createConversation = async (req, res) => {
//   try {
//     const { members, group, groupName } = req.body;
//     const conversation = new Conversation({
//       members,
//       group,
//       groupName,
//     });
//     await conversation.save();
//     res.status(201).json(conversation);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Could not create conversation.' });
//   }
// };

// exports.createConversation = async (req, res) => {
//   try {
//     const { members, group, groupName } = req.body;

//     // Ensure uniqueness of members (irrespective of order)
//     const uniqueMembers = [...new Set(members)];

//     if (uniqueMembers.length !== members.length ) {
//       return res.status(400).json({ error: 'Duplicate member IDs in the conversation.' });
//     }

//     // Check if the same combination of members already exists
//     const existingConversation = await Conversation.findOne({ members: uniqueMembers });

//     if (existingConversation) {
//       return res.status(409).json({ error: 'Conversation with the same members already exists.' });
//     }

//     const conversation = new Conversation({
//       members: uniqueMembers,
//       group,
//       groupName,
//     });

//     await conversation.save();
//     res.status(201).json(conversation);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Could not create conversation.' });
//   }
// };

exports.createConversation = async (req, res) => {
  try {
    const { members, group, groupName } = req.body;

    // Ensure uniqueness of members (irrespective of order)
    const uniqueMembers = [...new Set(members)];

    if (uniqueMembers.length !== members.length) {
      return res.status(400).json({ error: 'Duplicate member IDs in the conversation.' });
    }

    // Sort the unique members before checking for existence
    const sortedMembers = uniqueMembers.sort();

    // Check if the same combination of members already exists
    const existingConversation = await Conversation.findOne({ members: sortedMembers });

    if (existingConversation) {
      return res.status(409).json({ error: 'Conversation with the same members already exists.' });
    }

    const conversation = new Conversation({
      members: sortedMembers,
      group,
      groupName,
    });

    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not create conversation.' });
  }
};

exports.getConversationById = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const conversation = await Conversation.findById(conversationId);
    res.json(conversation);
  } catch (error) {
    res.status(404).json({ error: 'Conversation not found.' });
  }
};

exports.sendMessage = async (req, res) => {
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

exports.getConversationsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversations = await Conversation.find({ members: userId });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve conversations.' });
  }
};
