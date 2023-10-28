import { Box, Typography } from "@mui/material";
import React from "react";

const MessageComponent = ({ message, isUserMessage }) => {
  return (
    <Box
      // Use flexbox for layout
      display="flex"
      flexDirection="column"
      justifyContent="flex-end" // Align messages to the bottom
      alignItems={isUserMessage ? "flex-end" : "flex-start"} // Adjust alignment based on user message or not
      marginRight={isUserMessage ? ".35rem" : "0.35rem"} // Adjust margin based on user message or not
    >
      <Typography
        variant="body1"
        // Apply common styles to the message container
        sx={{
          display: "inline-block",
          padding: "8px 12px",
          position: "relative",
          marginLeft: isUserMessage ? "auto" : "1rem", // Align user messages to the right
          marginRight: isUserMessage ? "1rem" : "auto", // Align other messages to the left
          width: "fit-content",
          margin: "5px",
          borderRadius: "10px",
          wordWrap: "break-word",
          maxWidth: "70%",
          // Apply gradient background based on user message or not
          backgroundImage: isUserMessage
            ? "linear-gradient(135deg, rgba(157, 65, 225, 0.95), rgba(104, 62, 247, .9))"
            : "linear-gradient(135deg, lightgreen, lavender)",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default MessageComponent;
