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
  right: "5px",
  width: "4.5rem",
  backgroundColor: theme.palette.background.default,
  padding: ".08rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
};

export const chatListStyle = {
  flexGrow: 0,
  padding: ".08rem",
  display:"none",
  width: "100%",
  overflowY: "scroll",
  maxWidth: "40%",
  minWidth: "35%",
  WebkitOverflowScrolling: 'touch'
 };

export const chatAreaStyle = {
  flexGrow: 1,
  color: "primary",
  overflowY: "auto",
  position: "relative",
  WebkitOverflowScrolling: 'touch'
  // padding: '.8rem'
  // backgroundImage:"linear-gradient(135deg, rgba(157, 65, 225, 0.7), rgba(104, 62, 247, 0.6))",
};

export const Typerstyle = {
  position: "absolute",
  margin: "5px",
  width: "-webkit-fill-available",
  padding: "3px",
  bottom: "0",
  left: "0",
};
