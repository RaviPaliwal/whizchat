import { createTheme } from "@mui/material";

export const theme = createTheme({
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

export const appContainerStyle = {
    display: "flex",
    height: "100vh",
    maxWidth: "100vw",
    overflow: "hidden",
  };

export const sidebarStyle = {
    width: "6rem",
    backgroundColor: theme.palette.background.default,
    padding: ".08rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  };
  
  export const chatSectionStyle = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '.8rem',
    borderRadius:"0px"
  };

  export const chatAreaStyle = {
    ...chatSectionStyle,
    backgroundColor: "",
    color: "primary",
  };