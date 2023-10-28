import React, { useEffect } from "react";
import {
  ListItem,
  ListItemText,
  Box,
  Button,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import { BaseUrl } from "../../config";
import { useChatContext } from "../../Context/ChatContext";
import { InitialChat } from "../../Utils/InitializationDefaults";
import { useGenContext } from "../../Context/GeneralContext";

const AIChatListItem = () => {
  const ctx = useGenContext()
  const chat = useChatContext();
  useEffect(() => {
    const generateImage = async (prompt) => {
      const headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      const bodyContent = JSON.stringify({
        inputs: `${prompt}`,
      });
      const response = await fetch(`${BaseUrl}/api/generateImage`, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });
      const data = await response.blob();
      const imageUrl = URL.createObjectURL(data);

      const image = new Image();
      image.src = imageUrl;
      image.style.height = "50px";
      image.style.backgroundPosition = "center";

      const div = document.getElementById("aichatdp");
      if (!div.firstChild) {
        div.appendChild(image);
      }
    };

    generateImage("AI and Neural Network Brain Image Logo");
  }, []);
  const handleOpen = async () => {
    await chat.setChat(InitialChat);
    const chatList = document.getElementById("chatList");
    const chatsElement = document.getElementById("chats");
    if (ctx.screenWidth < 768) {
      chatList.style.display = "none";
      chatsElement.style.display = "block";
    }
  };
  const listItemStyle = {
    border: "none",
    borderRadius: "15px",
    backgroundImage:
      "linear-gradient(135deg, rgba(157, 65, 225, 0.7), rgba(104, 62, 247, 0.6)",
    marginBottom: "5px",
    backgroundColor: "rgba(104, 62, 247, 0.9)",
    width: "100%",
    position: "relative",
    "@media (maxWidth: 600px)": {
      height: "auto",
    },
  };

  return (
    <Box key={"MyaiChat"} sx={{ width: "100%" }}>
      <Button
        onClick={handleOpen}
        sx={{ padding: 0, textTransform: "none", color: "inherit" }}
        fullWidth
      >
        <ListItem component="div" style={listItemStyle}>
          <ListItemAvatar>
            <Avatar alt="Empty Avatar">
              <div
                id="aichatdp"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundPosition: "center",
                }}
              />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Whizchat AI" secondary="Chat with AI" />
        </ListItem>
      </Button>
    </Box>
  );
};

export default AIChatListItem;
