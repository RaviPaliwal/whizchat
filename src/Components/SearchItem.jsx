import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Box } from '@mui/material';

const SearchItem = ({ itemId, avatarUrl, name, lastMessage }) => {
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
    <Box sx={{ width: "100%" }}>
      <ListItem sx={{ ...listItemStyle }} id={itemId} component="div">
        <ListItemAvatar>
          <Avatar alt={`user_avatar_${itemId}`} src={avatarUrl} />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={lastMessage} />
      </ListItem>
    </Box>
  );
};

export default SearchItem;
