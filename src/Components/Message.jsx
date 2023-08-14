import React from "react";
import Avatar from "@mui/material/Avatar";
import {theme} from "./Theme"

const useStyles = {
  messageContainer: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "2px",
  },
  messageContent: {
    maxWidth: "70%",
    padding: "5px",
    borderRadius: "12px",
    background: theme.background.default,
    color: theme.palette.primary,
  },
  senderMessageContent: {
    alignSelf: "flex-end",
    background: theme.palette.secondary.main,
  },
  avatar: {
    marginRight: theme.spacing(1),
    alignSelf: "flex-end",
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
};

const Message = ({ message }) => {
  const classes = useStyles;

  return (
    <div className={`${classes.messageContainer} ${message.sender}`}>
      {message.sender === "other" && (
        <Avatar alt="Other" className={classes.avatar} />
      )}
      <div
        className={`${classes.messageContent} ${
          message.sender === "other" ? "" : classes.senderMessageContent
        }`}
      >
        <p>{message.text}</p>
      </div>
      {message.sender !== "other" && (
        <Avatar alt="You" className={classes.avatar} />
      )}
    </div>
  );
};

export default Message;
