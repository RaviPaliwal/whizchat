// Import necessary dependencies and components
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import logo from "../Assets/Images/logo.png";
import "../Assets/Styles/Login.css";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../config";
import { Checkbox, FormControlLabel, Link } from "@mui/material";

export default function LoginPage() {
  // State variables
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (event) => {
    event.preventDefault();

    // Request headers
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    // Request body content
    const bodyContent = JSON.stringify({
      email,
      password,
    });

    // Request options
    const reqOptions = {
      method: "POST",
      headers: headersList,
      body: bodyContent,
    };

    try {
      const response = await fetch(`${BaseUrl}/api/login`, reqOptions);
      const responseData = await response.json();
      console.log(responseData.user);

      if (responseData.success === true) {
        const user = JSON.stringify(responseData.user);
        sessionStorage.setItem("user", user);
        sessionStorage.setItem("login_status", true);
        navigate("/chats");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Function to handle signup
  const handleSignup = async (event) => {
    event.preventDefault();

    // Request body content
    const bodyContent = JSON.stringify({
      name: name,
      username: username,
      email: email,
      password: password,
      mobile: mobile,
    });

    console.log(bodyContent);

    // Request headers
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(`${BaseUrl}/api/register`, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      const responseData = await response.json();
      console.log(responseData.user);

      if (responseData.success === true) {
        const user = await JSON.stringify(responseData.user);
        sessionStorage.setItem("user", user);
        sessionStorage.setItem("login_status", true);
        navigate("/chats");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  // Function to toggle between login and signup
  const toggleSignup = (e) => {
    e.preventDefault();
    setShowSignup(!showSignup);
  };

  // Theme for the UI
  const mytheme = createTheme({
    palette: {
      primary: {
        main: "#683EF7",
      },
    },
  });

  return (
    <ThemeProvider theme={mytheme}>
      <CssBaseline />
      <Grid container sx={{ height: "100vh" }}>
        {/* Background Image */}
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
            overflow: "hidden",
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
              😍😍 Join the conversation and connect with others smartly!
            </Typography>
          </div>
        </Grid>

        {/* Login or Signup Form */}
        {showSignup ? (
          <Grid
            px={8}
            pt={0}
            item
            xs={12}
            md={6}
            component={Paper}
            elevation={6}
            square
          >
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
                onSubmit={handleSignup}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  name="mobile"
                  autoComplete="tel"
                  autoFocus
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  onClick={handleSignup}
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
                    <Link
                      href="#"
                      onClick={toggleSignup}
                      variant="body2"
                    >
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
                onSubmit={handleLogin}
                component="form"
                noValidate
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  onClick={handleLogin}
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
                    <Link
                      href="#"
                      onClick={toggleSignup}
                      variant="body2"
                    >
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
}