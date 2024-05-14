import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignUp from "./hooks/useSignUp";

const Img = styled.img`
  height: 3.6rem;
  width: auto;
`;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/" style={{ color: "#2890d1" }}>
        Trade & Treasure
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const { register, handleSubmit, getValues, reset } = useForm();

  const { SignUp, isLoading } = useSignUp();
  function onSubmit(data) {
    const { fullName, email, password } = data;
    SignUp(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Img src="./img/logo.png" />
            <Typography mt="10px" component="h1" variant="h5">
              Sign In To Trade & Treasure
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                disabled={isLoading}
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="Your Name"
                name="name"
                autoComplete="email"
                autoFocus
                {...register("fullName", {
                  required: "This field is required",
                })}
              />
              <TextField
                disabled={isLoading}
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="email"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              <TextField
                disabled={isLoading}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password (min 8 characters)"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Password needs a minimum of 8 characters",
                  },
                })}
              />
              <TextField
                disabled={isLoading}
                margin="normal"
                required
                fullWidth
                name="Repeat password"
                label="Repeat password"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password"
                {...register("passwordConfirm", {
                  required: "This field is required",
                  validate: (value) =>
                    value === getValues().password || "Password need to match",
                })}
              />
              <Button
                disabled={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Typography>
                <Link style={{ color: "#2890d1" }} to="/login">
                  {" "}
                  I Have an account already{" "}
                </Link>
              </Typography>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
