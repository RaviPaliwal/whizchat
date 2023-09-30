import React, { useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import { Search } from "@mui/icons-material";
import { Button, InputAdornment, Paper, TextField } from "@mui/material";
import logo from "../Assets/Images/logo.png";
import { useSearchContext } from "../Context/SearchContext";

const ChatListHeader = () => {
  const search = useSearchContext();
  const [query, setQuery] = useState("");

  const handlequeryChange = async (e) => {
    e.preventDefault();
    setQuery(e.target.value); // set query
    search.handleSearch(query); // handle query change
  };

  return (
    <Paper
      sx={{
        borderRadius: "0",
        height: "4.95rem",
      }}
    >
      <CardHeader
        style={{ paddingTop: "0", marginTop: "0" }}
        avatar={<img width={120} src={logo} alt="logo" />}
        title={
          <TextField
            size="small"
            value={query}
            type="text"
            id="search"
            onChange={handlequeryChange}
            label="Find Chats"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    sx={{
                      right: "0",
                      transition: "ease-in-out",
                      "&:hover": { transform: "scale(1.2)" },
                    }}
                    disableRipple
                  >
                    <Search />
                  </Button>
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
