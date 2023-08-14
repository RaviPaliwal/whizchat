import React, { useEffect, useRef, useState } from "react";
import {
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import Message from "./Message";
import { chatAreaStyle } from "./Theme";
import SendIcon from "@mui/icons-material/Send";
import ChatHeader from "./ChatHeader";

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
    <div style={{ ...chatAreaStyle, display: "flex", flexDirection: "column", height: "100%" }}>
      <Paper style={{ height: "100%", borderRadius: "0px", borderLeft: ".5px solid gray" }}>
        <ChatHeader />
        <div
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
        </div>
        <div style={{ display:"flex", flexDirection:"row", alignSelf: "flex-end", width: "100%"  }}>
          <TextField
            label="Type a message"
            style={{
              width: "100%",
              margin:"4px",
            }}
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
                  <SendIcon onClick={() => sendMessage("Bye")} />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </Paper>
    </div>
  );
};

export default ChatTab;
