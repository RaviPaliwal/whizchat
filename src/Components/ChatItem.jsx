import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

// Define the style for the list item
const listItemStyle = {
  border: "none",
  borderRadius: "15px",
  backgroundImage: "linear-gradient(135deg, rgba(157, 65, 225, 0.7), rgba(104, 62, 247, 0.6))",
  marginBottom: "5px",
  height: "5rem",
  backgroundColor: "#683EF7",
  width: "100%",
  "@media (max-width: 600px)": {
    height: "auto",
  },
};

// ChatItem component
const ChatItem = ({ id, avatarSrc, primary, secondary }) => {
  return (
    <ListItem sx={{ ...listItemStyle }} id={id} component="button">
      <ListItemAvatar>
        <Avatar alt={`userimg${id}`} src={avatarSrc} />
      </ListItemAvatar>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
};

export default ChatItem;