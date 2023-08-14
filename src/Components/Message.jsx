import { Chip } from "@mui/material";
import React from "react";
const msgstyle={
  display:"Block",
  marginY:"5px"

}


const Message = ({ message }) => {
  return (
    <Chip style={msgstyle} label={message.text} />
  );
};

export default Message;
