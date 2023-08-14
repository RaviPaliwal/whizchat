import * as React from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const cardtheme = createTheme({
  text: {
    primary: 'black',
    secondary: 'black',
  },
});

const customTheme = createTheme({
  components: {
    MuiCardHeader: {
      styleOverrides: {
        subheader: {
          color: 'green', // Change this color to your desired color
        },
        title:{
            fontWeight:"700"
        }
      },
    },
  },
});

export default function ChatHeader() {
  return (
    <ThemeProvider theme={customTheme}>
      <Card sx={{ maxWidth: '100%'}}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              D
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Deepti Sharma"
          subheader="Online"
        />
      </Card>
    </ThemeProvider>
  );
}
