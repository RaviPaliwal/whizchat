import { InputAdornment, TextField } from "@mui/material";
import {React} from "react";
import SendIcon from "@mui/icons-material/Send";

const Typer = ({setMessages,sendMessage}) => {
  
  return (
    <TextField
      label="Type a message"
      style={{
        position: "fixed",
        bottom: "0",
        right:"0",
        width: "50%",
        marginBottom: "10px",
      }}
      variant="outlined"
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
          sendMessage(e.target.value);
          e.target.value = "";
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SendIcon onClick={() => sendMessage("HI")} />
          </InputAdornment>
        ),
      }}
    />
  );
};
export default Typer;
