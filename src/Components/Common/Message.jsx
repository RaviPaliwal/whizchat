import { Box, Typography } from "@mui/material";
import React from "react";

const Message = ({ message, group }) => {
  // Retrieve user from session storage
  const user = JSON.parse(sessionStorage.getItem("user"));

  // Check if the message is from the current user
  const isUserMessage = message.sender._id === user._id;
  function timestampToTimeString(timestamp) {
    const date = new Date(timestamp);

    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Determine if it's AM or PM
    const amOrPm = hours >= 12 ? "pm" : "am";

    // Convert to 12-hour format
    if (hours > 12) {
      hours -= 12;
    }

    // Add leading zeros if necessary
    hours = hours < 10 ? `${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes} ${amOrPm}`;
  }

  const timeString = timestampToTimeString(message.timestamp);

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
        
        {message.content}

        <span style={{
            display: "inline-block",
            width: "2.2rem",
          }}></span>

        <Box
          style={{
            position: "absolute",
            display: "block",
            marginLeft:"7px",
            right: "3px",
            bottom:"0",
            color: isUserMessage?"white":"gray",
            fontSize: "60%",
          }}
        >
          {!isUserMessage&&group&&message.sender.name+"   "}
          {/* Find Proper Place */}
          {timeString}
        </Box>
      </Typography>
    </Box>
  );
};

export default Message;
