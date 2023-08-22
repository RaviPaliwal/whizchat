import { Box, Typography } from "@mui/material";
import React from "react";

const Message = ({ message }) => {
  const isUserMessage = message.sender === "user"; // Corrected this line
  return (
    <Box style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: isUserMessage ? "end" : "start", // Adjusted alignment
        marginRight: isUserMessage ? ".35rem" : "0.35rem", // Adjusted margin
      }}>
      <Typography
        variant="body1"
        style={{
          display: "block",
          padding: "8px 12px",
          position: "relative",
          marginLeft: isUserMessage ? "auto" : "1rem",
          marginRight: isUserMessage ? "1rem" : "auto",
          width: "fit-content",
          margin: "5px",
          backgroundImage: isUserMessage
            ? "linear-gradient(135deg, rgba(157, 65, 225, 0.95), rgba(104, 62, 247, .9))"
            : "linear-gradient(135deg, lightgreen, lavender)",
          borderRadius: "10px",
          wordWrap: "break-word",
          maxWidth: "70%",
        }}
      >
        {message.text}
      </Typography>
    </Box>
  );
};

export default Message;
