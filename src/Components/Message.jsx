import { Typography } from "@mui/material";
import React from "react";

const Message = ({ message }) => {
  return (
    <Typography
      variant="body1"
      style={{
        display: "block",
        padding: "8px 12px",
        width:"fit-content",
        margin: "5px",
        backgroundImage:"linear-gradient(135deg, rgba(157, 65, 225, 0.4), rgba(104, 62, 247, .6))", // Set your desired background color
        borderRadius: "10px",
        wordWrap: "break-word",
        maxWidth: "70%", // You can adjust the maximum width as needed
      }}
    >
      {message.text}
    </Typography>
  );
};

export default Message;
