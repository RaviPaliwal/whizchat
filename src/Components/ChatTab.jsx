import React, { useEffect, useRef, useState } from "react";
import { Box, Paper, TextField } from "@mui/material";
import Message from "./Message";
import { Typerstyle, chatAreaStyle } from "./Theme";
import ChatHeader from "./ChatHeader";
import styled from "@emotion/styled";

const ChatTab = () => {
  const [messages, setMessages] = useState([]); // Store the chat messages
  
  const sendMessage = (text) => {
    // Function to send a message
    const newMessage = { text, sender: "user" };
    setMessages([...messages, newMessage]);
  };

  const scrollRef = useRef(null);

  useEffect(() => {
    // Scroll chat container to the bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      style={{
        ...chatAreaStyle,
      }}
    >
      <Paper
        style={{
          backgroundImage:"url(https://source.unsplash.com/random?wallpapers)",
          height: "100%",
          borderRadius: "0px",
          borderLeft: ".8px solid gray",
        }}
      >
        <ChatHeader />
        <Box
          ref={scrollRef}
          style={{
            maxHeight: "75vh",
            overflowY: "auto",
            flex: 1, // Let the messages container fill the remaining height
            
          }}
          className="messages-container"
        >
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </Box>
        <Box style={Typerstyle}>
          <TextField
            label="Type a message"
            style={{
              width: "100%",
            }}
            InputProps={{
              style: {
                color: "white", // Change this color to the color you want
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
        </Box>
      </Paper>
    </div>
  );
};

export default ChatTab;