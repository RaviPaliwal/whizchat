import React from 'react';
import { CssBaseline, createTheme, ThemeProvider, Container, Paper, Typography, Tabs, Tab, List, ListItem, ListItemAvatar, Avatar, ListItemText, TextField } from '@mui/material';
import "../Assets/Styles/HomePage.css";
import { AccountCircle, FiberManualRecord, Chat } from '@mui/icons-material';
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#683EF7',
    },
    secondary: {
      main: "#683EF7",
    },
    background: {
      default: '#090912'
    },
    text: {
      primary: '#683EF7',
      secondary: "white",
    },
  },
});

// Define the styles for the app container, sidebar, chat section, and chat area
const appContainerStyle = {
  display: 'flex',
  height: '100vh',
  maxWidth: '100vw',
  overflow: 'hidden',
};

const sidebarStyle = {
  width: '6rem',
  backgroundColor:  theme.palette.background.default,
  padding: '.08rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
};

const chatSectionStyle = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '.8rem',
  borderRadius:"0px"
};

const chatAreaStyle = {
  ...chatSectionStyle,
  backgroundColor: "",
  color: "primary",
};

const listItemStyle = {
  border: "none",
  borderRadius: "15px",
  backgroundImage:"linear-gradient(135deg, rgba(157, 65, 225, 0.7), rgba(104, 62, 247, 0.6))",
  marginBottom: "5px",
  height: "5rem",
  backgroundColor:"#683EF7",
  width: "100%",
  "@media (max-width: 600px)": {
    height: "auto",
  },
};

function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false} disableGutters style={appContainerStyle}>
        {/* Sidebar */}
        <Paper style={sidebarStyle}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={0}
            textColor="secondary"
            indicatorColor="secondary"
            style={{ marginBottom: '16px' }}
          >
            <Tab label="Home" icon={<AccountCircle className='customNavicon ' />} />
            <Tab label="Status" icon={<FiberManualRecord className='customNavicon' />} />
            <Tab label="New Chat" icon={<Chat className='customNavicon' />} />
          </Tabs>
        </Paper>

        {/* Chat profiles */}
        <Paper style={{ ...chatSectionStyle, maxWidth:"28rem", }}>
          {/* Display selected user's profile */}
          <Typography variant="h6" gutterBottom>
            Chats
          </Typography>
          {/* Profile details */}
          <List>
            <ListItem sx={{ ...listItemStyle }} component="button">
              <ListItemAvatar>
                <Avatar alt="userimg1" src="https://source.unsplash.com/random?wallpapers" />
              </ListItemAvatar>
              <ListItemText
                primary="Ravi Paliwal"
                secondary="Welcome to WhizChat!"
              />
            </ListItem>
            <ListItem sx={{ ...listItemStyle }} component="button">
              <ListItemAvatar>
                <Avatar alt="User 2" src="https://source.unsplash.com/random?wallpapers" />
              </ListItemAvatar>
              <ListItemText
                sx={{ overflowX: "clip" }}
                primary="Shashwat Tiwari"
                secondary="Hey How are you?🙋‍♂️"
              />
            </ListItem>
            {/* Add more dummy user profiles */}
          </List>
        </Paper>
        {/* Chat area */}
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
      </Container>
    </ThemeProvider>
  );
}

export default HomePage;