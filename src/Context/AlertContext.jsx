import { Snackbar } from "@mui/material";
import React, { createContext, useState } from "react";
import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

const AlertContext = createContext();

export const useAlertContext = () => {
  return useContext(AlertContext);
};
export const AlertContextProvider = ({ children }) => {
  const [msg, setMsg] = useState("Hello");
  const [sevirity, setSevirity] = useState("success"); //error warning info
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  const showPopup = (msg,sevierity)=>{
    setOpen(true);
    setMsg(msg)
    setSevirity(sevierity)
  }
  const value = {
    showPopup
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        action={action}
      >
        <MuiAlert
          onClose={handleClose}
          severity={sevirity}
          sx={{ width: "100%" }}
        >
          {msg}
        </MuiAlert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
