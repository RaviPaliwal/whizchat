import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Typerstyle, chatAreaStyle } from "../../Utils/Theme";
import ChatHeader from "../Chat/ChatHeader";
import { BaseUrl, RandPhotoUrlChat } from "../../config";
import MessageComponent from "./MessageComponent";

const AIChatSection = () => {
  const [mode, setMode] = React.useState("TextToText");
  const [loading, setLoading] = useState("none");
  const scrollRef = useRef(null);
  const handleMode = (event, mode) => {
    setMode(mode);
  };

  const [messages, setMessages] = useState([
    { _id: Date.now(), isUserMessage: false, message: "😍Welcome User!" },
    {
      _id: Date.now(),
      isUserMessage: false,
      message: "👋Info: This Chat will not be stored",
    },
  ]);

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

    const newMessage = {
      _id: Date.now(),
      isUserMessage: false,
      message: (
        <img
          src={imageUrl}
          alt="Generated_Img"
          style={{
            height: "250px",
            borderRadius: "8px",
            backgroundPosition: "center",
          }}
        />
      ),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const chatWithBot = async (prompt) => {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(`${BaseUrl}/api/chatwithbot/${prompt}`, {
      method: "GET",
      headers: headersList,
    });
    let data = await response.json();
    const newMessage = {
      _id: Date.now(),
      isUserMessage: false,
      message: data[0],
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // console.log(data);
  };

  const sendMessage = async (text) => {
    setMessages([
      ...messages,
      { _id: Date.now(), isUserMessage: true, message: text },
    ]);
    if (mode === "TextToImage") {
      setLoading("block");
      await generateImage(text);
      setLoading("none");
    }
    if (mode === "TextToText") {
      setLoading("block");
      await chatWithBot(text);
      setLoading("none");
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      style={{
        ...chatAreaStyle,
      }}
      id="chats" //dont remove
    >
      <Paper
        style={{
          //{chat.chat.receiver.username ==="!!!null"?} conditionally setting
          backgroundImage: `url(${RandPhotoUrlChat})`,
          height: "100%",
          backgroundPositionX: "center",
          backgroundPositionY: "center",
          borderRadius: "0px",
        }}
      >
        <ChatHeader />

        <Box
          ref={scrollRef}
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
            flex: 1, // Let the messages container fill the remaining height
          }}
          className="messages-container"
          id="messages-box"
        >
          {messages.map((item) => {
            return (
              <MessageComponent
                key={item._id}
                message={item.message}
                isUserMessage={item.isUserMessage}
              />
            );
          })}
        </Box>
        <Box style={{ marginBottom: "20%" }}>
          <CircularProgress style={{ marginLeft: "25%", display: loading }} />
        </Box>

        <Box style={Typerstyle}>
          <TextField
            label="Type a message"
            style={{
              width: "100%",
              marginBottom: "7px",
            }}
            InputProps={{
              style: {
                color: "white",
                // Change this color to the color you want
              },
            }}
            variant="standard"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim() !== "") {
                sendMessage(e.target.value);
                e.target.value = "";
              }
            }}
          />
          <Paper>
            <ToggleButtonGroup
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              value={mode}
              exclusive
              onChange={handleMode}
              aria-label="mode-select"
            >
              <ToggleButton
                value="TextToText"
                aria-label="Text-to-Text"
                style={{ width: "50%" }}
              >
                Text To Text
              </ToggleButton>
              <ToggleButton
                value="TextToImage"
                aria-label="Text-to-Image"
                style={{ width: "50%" }}
              >
                Text To Image
              </ToggleButton>
            </ToggleButtonGroup>
          </Paper>
        </Box>
      </Paper>
    </div>
  );
};

export default AIChatSection;
