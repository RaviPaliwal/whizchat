import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Button,
  Badge,
} from "@mui/material";
import { useChatContext } from "../Context/ChatContext";
import { useGenContext } from "../Context/GeneralContext";
import { joinRoom } from "../Socket/SocketConfig";
import { BaseUrl } from "../config";
import Logo from "../Assets/Images/logo2.png";

const ChatItem = ({ itemId, avatarUrl, name, lastMessage, newchat }) => {
  const chat = useChatContext();
  const ctx = useGenContext();
  const socket = ctx.socket;

  const markRead = async () => {
    // Set headers for the request
    const headers = {
      Accept: "*/*",
    };

    // Send a POST request to mark the conversation as read
    // const response =
    await fetch(`${BaseUrl}/api/conversation/${newchat._id}/markread`, {
      method: "POST",
      headers: headers,
    });

    // // Parse the response data
    // const data = await response.json();
    // // console.log(data);
  };

  const listItemStyle = {
    border: "none",
    borderRadius: "15px",
    backgroundImage:
      "linear-gradient(135deg, rgba(157, 65, 225, 0.7), rgba(104, 62, 247, 0.6))",
    marginBottom: "5px",
    backgroundColor: "rgba(104, 62, 247, 0.9)",
    width: "100%",
    position: "relative", // Add position relative to the ListItem
    "@media (max-width: 600px)": {
      height: "auto",
    },
  };

  const badgeStyle = {
    position: "absolute",
    top: "-5px", // Adjust the top value to position the badge vertically
    right: "0px", // Adjust the right value to position the badge horizontally
    backgroundColor: "#790100", // Customize the badge background color
    color: "white", // Customize the badge text color
    borderRadius: "50%", // Make it a circle
    padding: "4px 12px", // Adjust the padding as needed
  };

  return (
    <Box key={itemId} sx={{ width: "100%" }}>
      {/* Wrap the Box with a Button */}
      <Button
        sx={{ padding: 0, textTransform: "none", color: "inherit" }}
        onClick={async () => {
          newchat.unseenCount = 0;
          joinRoom(socket, newchat._id);
          // console.log("Joined New Chat Room " + newchat._id);
          await chat.setChat(newchat);
          const chatList = document.getElementById("chatList");
          const chatsElement = document.getElementById("chats");
          if (ctx.screenWidth < 768) {
            chatList.style.display = "none";
            chatsElement.style.display = "block";
          }
          markRead();
        }}
        fullWidth
      >
        <ListItem sx={{ ...listItemStyle }} id={itemId} component="div">
          <ListItemAvatar>
            <Avatar
              alt={`user_avatar_${itemId}`}
              src={newchat._id === "Whizchat!!!null" ? Logo : avatarUrl}
            />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={`${
              newchat.messages.length > 0 &&
              newchat.messages[newchat.messages.length - 1].sender ===
                newchat.receiver._id
                ? newchat.receiver.name.split(" ")[0] + " :  "
                : newchat._id === "Whizchat!!!null"
                ? ""
                : "You :   "
            }${lastMessage}`}
          />
          {newchat.messages.length > 0 &&
            newchat.unseenCount !== 0 &&
            newchat.messages[newchat.messages.length - 1].sender ===
              newchat.receiver._id && (
              <Badge sx={badgeStyle}>{newchat.unseenCount}</Badge>
            )}
        </ListItem>
      </Button>
    </Box>
  );
};

export default ChatItem;
