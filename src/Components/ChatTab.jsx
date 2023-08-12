import React from 'react'
import { Typography,TextField, Paper, InputAdornment } from '@mui/material';
import SendIcon from "@mui/icons-material/Send";
import { chatAreaStyle } from './Theme';



const ChatTab = () => {
  return (
    <Paper style={chatAreaStyle}>
          {/* Display chat messages */}
          <Typography variant="h6" gutterBottom>
            Chat Area
          </Typography>
          {/* Chat messages */}
          <TextField
            label="Type a message"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SendIcon />
                </InputAdornment>
              ),
            }}
          />
        </Paper>
  )
}

export default ChatTab
