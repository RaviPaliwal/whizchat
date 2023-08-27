import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        content: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    unseenCount: {
      type: Number,
      default: 0,
    },
    group: {
      type: Boolean,
      default: false,
    },
    groupName: String,
    groupMembers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        isAdmin: Boolean,
      },
    ],
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    muted: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    about: String,
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model('Conversation', ConversationSchema);

export default Conversation;
