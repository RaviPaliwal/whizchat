import React from 'react'
import ChatItem from './ChatItem'
import { Paper, Typography, List} from '@mui/material';
import { chatSectionStyle } from './Theme';


const Chats = () => {
  return (
    <Paper style={{ ...chatSectionStyle, maxWidth:"28rem", }}>
    {/* Display selected user's profile */}
    <Typography variant="h6" gutterBottom>
      Chats
    </Typography>
    {/* Profile details */}
    <List>
    <ChatItem id={1} avatarSrc={"https://media.istockphoto.com/id/1485546774/photo/bald-man-smiling-at-camera-standing-with-arms-crossed.webp?b=1&s=170667a&w=0&k=20&c=c2rsC66nJQAjkN6vCkhyB0vLHUiZhJSACMCBVF9HJJs="} primary={"Ravi Paliwal"} secondary={"Welcome To WhiZchat!"} />
    <ChatItem id={1} avatarSrc={"https://media.istockphoto.com/id/1485546774/photo/bald-man-smiling-at-camera-standing-with-arms-crossed.webp?b=1&s=170667a&w=0&k=20&c=c2rsC66nJQAjkN6vCkhyB0vLHUiZhJSACMCBVF9HJJs="} primary={"Ravi Paliwal"} secondary={"Welcome To WhiZchat!"} />
    </List>
  </Paper>
  )
}

export default Chats
