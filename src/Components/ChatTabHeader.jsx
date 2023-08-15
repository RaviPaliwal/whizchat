import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid"; // Import the Grid component
import { useGenContext } from '../Context/GeneralContext';





// Create custom theme for the card header
const customTheme = createTheme({
  components: {
    MuiCardHeader: {
      styleOverrides: {
        subheader: {
          color: "green", // Change this color to your desired color
        },
        title: {
          fontSize:"20px",
          fontWeight: "700",
        },
      },
    },
  },
});

export default function ChatHeader() {
  const states = useGenContext()
  
  return (
    <ThemeProvider theme={customTheme}>
      <Card sx={{ maxWidth: "100%" }}>
        <CardHeader
          title={
            <Grid container alignItems="center" spacing={1}>
              {!states.toggle&&<Grid item>
                <IconButton aria-label="back" onClick={states.OpenChats}>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>}
              <Grid item>
                <Avatar aria-label="recipe">D</Avatar>
              </Grid >
              <Grid item style={{display:"flex",flexDirection:"column"}}>
                Deepti Sharma
               <span style={{fontSize:"17px"}} className="text-success">online</span>
              </Grid>
              
            </Grid>
          }
          
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />
      </Card>
    </ThemeProvider>
  );
}
