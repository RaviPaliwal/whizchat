import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Box } from '@mui/material';

const ChatItem = ({ itemId, avatarUrl, username, lastMessage }) => {
  const listItemStyle = {
    border: "none",
    borderRadius: "15px",
    backgroundImage: "linear-gradient(135deg, rgba(157, 65, 225, 0.7), rgba(104, 62, 247, 0.6))",
    marginBottom: "5px",
    backgroundColor: "rgba(104, 62, 247, 0.9)",
    width: "100%",
    "@media (max-width: 600px)": {
      height: "auto",
    },
  };

  return (
    <Box sx={{ margin: "2px 8px" }}>
      <ListItem sx={{ ...listItemStyle }} id={itemId} component="button">
        <ListItemAvatar>
          <Avatar alt={`user_avatar_${itemId}`} src={avatarUrl} />
        </ListItemAvatar>
        <ListItemText primary={username} secondary={lastMessage} />
      </ListItem>
    </Box>
  );
};

export default ChatItem;
