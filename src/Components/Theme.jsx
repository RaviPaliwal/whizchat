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
      primary: "#090912",
      secondary: "#ffff",
    },
  },
});

export const appContainerStyle = {
  display: "flex",
  height: "100vh",
  // maxWidth: "100vw",
  // overflow: "hidden",
};

export const sidebarStyle = {
  position: "relative",
  right: "10px",
  width: "4.5rem",
  backgroundColor: theme.palette.background.default,
  padding: ".08rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
};

export const chatSectionStyle = {
  flexGrow: 0,
  padding: ".08rem",
  width: "auto",
  overflowY: "scroll",
  maxWidth: "50%",
};

export const chatAreaStyle = {
  flexGrow: 1,
  display: "block",
  // padding: '.8rem'
  // backgroundImage:"linear-gradient(135deg, rgba(157, 65, 225, 0.7), rgba(104, 62, 247, 0.6))",
  color: "primary",
  overflowY: "auto",
  position: "relative",
};

export const Typerstyle = {
  position: "absolute",
  margin: "5px",
  width: "-webkit-fill-available",
  padding: "3px",
  bottom: "0",
  left: "0",
  
};
