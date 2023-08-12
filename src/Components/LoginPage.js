import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import logo from "../Assets/Images/logo.png";
import "../Assets/Styles/Login.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showSignup, setShowSignup] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const toggleSignup = (e) => {
    e.preventDefault();
    setShowSignup(!showSignup);
  };
  const mytheme = createTheme({
    palette: {
      primary: {
        main: "#683EF7", // Primary color
      },
    },
  });

  return (
    <ThemeProvider theme={mytheme}>
      <CssBaseline />
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            position: "relative",
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            overflow: "hidden", // Hide overflowing text
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              padding: "16px",
              background: "rgba(255, 255, 255, 0.7)",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Welcome to The Ai Powered Chat App!
            </Typography>
            <Typography variant="body1">
              😍😍 Join the conversation and connect with others smartly !
            </Typography>
          </div>
        </Grid>

        {/* Signup Grid */}
        {showSignup ? (
          <Grid
            px={6}
            item
            xs={12}
            md={6}
            component={Paper}
            elevation={6}
            square
          >
            {/* Signup Form */}
            {/* ... */}
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                className="logoAnimation"
                style={{ width: "60%" }}
                src={logo}
                alt="logo"
              />
              <Typography component="h1" variant="h5">
                Signup
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  name="mobile"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/chats");
                  }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Privacy policy
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" onClick={toggleSignup} variant="body2">
                      Already have an account? Log in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        ) : (
          <Grid
            item
            px={6}
            xs={12}
            md={6}
            component={Paper}
            elevation={6}
            square
          >
            {/* Login Form */}
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                className="logoAnimation"
                style={{ width: "60%" }}
                src={logo}
                alt="logo"
              />
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" onClick={toggleSignup} variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            {/* ... */}
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
}
