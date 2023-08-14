import React, { useState } from "react";
import {
  Typography,
  Paper,
} from "@mui/material";
import Message from "./Message"; // A separate component for rendering messages
import { chatAreaStyle } from "./Theme";
import Typer from "./Typer";

const ChatTab = () => {
  const [messages, setMessages] = useState([]); // Store the chat messages
  const sendMessage = (text) => {
    // Function to send a message
    const newMessage = { text, sender: "user" };
    setMessages([...messages, newMessage]);
  };

  return (<>
    <Paper style={chatAreaStyle}>
      <Typography variant="h6" gutterBottom>
        Chat Area
      </Typography>
      <div className="messages-container">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
    </Paper>

    <Typer setMessages={setMessages} sendMessage={sendMessage}/></>
  );
};

export default ChatTab;
