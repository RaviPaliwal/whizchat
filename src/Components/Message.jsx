import { Box, Typography } from "@mui/material";
import React from "react";

const Message = ({ message }) => {
  const isUserMessage = true
  // message.sender === "user";
  return (
    <Box style={{
        display: "flex",
        flexDirection : "column",
        justifyContent : "end",
        alignItems : "end",
        marginRight: ".35rem"
    }}  >
    <Typography
      variant="body1"
      style={{
        display: "block",
        padding: "8px 12px",
        position: "relative",
        marginLeft: !isUserMessage ? "auto" : "1rem", // Adjust margins accordingly
        marginRight:isUserMessage ? "1rem" : "auto", // Adjust margins accordingly
        width: "fit-content",
        margin: "5px",
        backgroundImage: isUserMessage
          ? "linear-gradient(135deg, rgba(157, 65, 225, 0.95), rgba(104, 62, 247, .9))"
          : "linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05))", // Background colors based on sender
        borderRadius: "10px",
        wordWrap: "break-word",
        maxWidth: "70%", // You can adjust the maximum width as needed
      }}
    >
      {message.text}
    </Typography>
    </Box>
  );
};

export default Message;
