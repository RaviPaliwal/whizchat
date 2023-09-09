import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import { useChatContext } from "../Context/ChatContext";
import { useGenContext } from "../Context/GeneralContext";
const ChatItem = ({ itemId, avatarUrl, name, lastMessage, newchat }) => {
  const chat = useChatContext();
  const ctx = useGenContext();

  const listItemStyle = {
    border: "none",
    borderRadius: "15px",
    backgroundImage:
      "linear-gradient(135deg, rgba(157, 65, 225, 0.7), rgba(104, 62, 247, 0.6))",
    marginBottom: "5px",
    backgroundColor: "rgba(104, 62, 247, 0.9)",
    width: "100%",
    "@media (max-width: 600px)": {
      height: "auto",
    },
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Wrap the Box with a Button */}
      <Button
        sx={{ padding: 0, textTransform: "none", color: "inherit" }}
        onClick={() => {
          chat.setChat(newchat);
          const chatList = document.getElementById("chatList");
          const chatsElement = document.getElementById("chats");
          if (ctx.screenWidth < 768) {
            chatList.style.display = "none";
            chatsElement.style.display = "block";
          }
        }}
        fullWidth
      >
        <ListItem sx={{ ...listItemStyle }} id={itemId} component="div">
          <ListItemAvatar>
            <Avatar alt={`user_avatar_${itemId}`} src={avatarUrl} />
          </ListItemAvatar>
          <ListItemText primary={name} secondary={lastMessage} />
        </ListItem>
      </Button>
    </Box>
  );
};

export default ChatItem;
