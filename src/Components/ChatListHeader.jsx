import React from "react";
import CardHeader from "@mui/material/CardHeader";
import { Search} from "@mui/icons-material";
import { Button, InputAdornment, Paper, TextField } from "@mui/material";
import logo from "../Assets/Images/logo.png"
const ChatListHeader = () => {
  return (
    <Paper sx={
      {
        borderRadius:"0",
        height:"4.95rem"
      }
    }>
      <CardHeader 
        style={{paddingTop:"0", marginTop:"0"}}
        avatar={<img  width={120}  src={logo} alt="logo" />}
        // action={
        //   <IconButton aria-label="chatlistheader-nav">
        //     <>
        //     <Settings />
        //     </>
        //   </IconButton>
        // }
        title={
          <TextField
            size="small"
            sx={{}}
            type="search"
            id="search"
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{position:"static"}}>
                  <Button   sx={{position:"absolute", right:"0",transition:"ease-in-out" , '&:hover': {transform:"scale(1.2)"}}} disableRipple >< Search /></Button>
                </InputAdornment>
              ),
            }}
          />
        }
      />
    </Paper>
  );
};

export default ChatListHeader;
