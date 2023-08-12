import React, { useState } from "react";
import {
  Typography,
  TextField,
  Paper,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Message from "./Message"; // A separate component for rendering messages
import { chatAreaStyle } from "./Theme";

const ChatTab = () => {
  const [messages, setMessages] = useState([]); // Store the chat messages

  const sendMessage = (text) => {
    // Function to send a message
    const newMessage = { text, sender: "user" };
    setMessages([...messages, newMessage]);
  };

  return (
    <Paper style={chatAreaStyle}>
      <Typography variant="h6" gutterBottom>
        Chat Area
      </Typography>
      <div className="messages-container">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <TextField
        label="Type a message"
        variant="outlined"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim() !== "") {
            sendMessage(e.target.value);
            e.target.value = "";
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SendIcon onClick={() => sendMessage("HI")} />
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
};

export default ChatTab;
