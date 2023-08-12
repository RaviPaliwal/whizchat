import React from "react";
import {
  CssBaseline,
  createTheme,
  ThemeProvider,
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
} from "@mui/material";
import "../Assets/Styles/HomePage.css";
import { AccountCircle, FiberManualRecord, Chat } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";

const theme = createTheme({
  palette: {
    primary: {
      main: "#683EF7",
    },
    secondary: {
      main: "#683EF7",
    },
    background: {
      default: "#090912",
    },
    text: {
      primary: "#683EF7",
      secondary: "white",
    },
  },
});

const appContainerStyle = {
  display: "flex",
  height: "100vh", // 100% of the viewport height
  maxWidth: "100vw", // 100% of the viewport width
  overflow: "hidden", // Hide overflow from overflowing content
};

const sidebarStyle = {
  width: "6rem", // Fixed sidebar width
  backgroundColor: theme.palette.background.default,
  padding: ".08rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
};

const chatSectionStyle = {
  flexGrow: 1, // Fill the remaining space
  display: "flex",
  flexDirection: "column",
  padding: ".8rem",
};

const chatAreaStyle = {
  ...chatSectionStyle,
  backgroundColor: "", // Change the background color
  color: "primary",
};

const listItemStyle = {
  border: "none",
  borderRadius: "15px",
  marginBottom: "5px",
  height: "5rem",
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
            style={{ marginBottom: "16px" }}
          >
            <Tab
              label="Home"
              icon={<AccountCircle className="customNavicon " />}
            />
            <Tab
              label="Status"
              icon={<FiberManualRecord className="customNavicon" />}
            />
            <Tab label="New Chat" icon={<Chat className="customNavicon" />} />
          </Tabs>
        </Paper>

        {/* Chat profiles */}
        <Paper style={{ ...chatSectionStyle }}>
          {/* Display selected user's profile */}
          <Typography variant="h6" gutterBottom>
            Chats
          </Typography>
          {/* Profile details */}
          <List>
            <ListItem sx={{ ...listItemStyle }} component="button">
              <ListItemAvatar>
                <Avatar
                  alt="userimg1"
                  src="url(https://source.unsplash.com/random?wallpapers)"
                />
              </ListItemAvatar>
              <ListItemText
                primary="Ravi Paliwal"
                secondary="Welcome to WhizChat!"
              />
            </ListItem>
            <ListItem sx={{ ...listItemStyle }} component="button">
              <ListItemAvatar>
                <Avatar
                  alt="User 2"
                  src="url(https://source.unsplash.com/random?wallpapers)"
                />
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
          {/* <TextField  label="Type a message" variant="outlined" /> */}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default HomePage;
