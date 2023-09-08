import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Box, Button } from '@mui/material';
import { useChatContext } from '../Context/ChatContext';
const ChatItem = ({ itemId, avatarUrl, name, lastMessage,newchat }) => {
  const chat = useChatContext();

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
      {/* Wrap the Box with a Button */}
      <Button sx={{ padding: 0, textTransform:"none",color: 'inherit', }} onClick={() => chat.setChat(newchat)} fullWidth >
        <ListItem sx={{ ...listItemStyle }} id={itemId} component="div">
          <ListItemAvatar>
            <Avatar alt={`user_avatar_${itemId}`} src={avatarUrl} />
          </ListItemAvatar>
          <ListItemText primary={name} secondary={lastMessage} />
        </ListItem>
      </Button>
    </Box>
  );
};

export default ChatItem;
