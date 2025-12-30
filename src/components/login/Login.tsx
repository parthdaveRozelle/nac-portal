"use client";

import { ROUTES } from "@/constants";
// import DoctorHttpClient from "@/services/doctor/doctorService";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginStyle as styles } from "@/styles";
import { useRouter } from "next/navigation";
import { DoctorHttpClient } from "@/services";

export const Login = () => {
  const theme = useTheme();
  const router = useRouter();
  //   const [alertCheck, setAlertCheck] = useState(false);
  //   const [backFade, setBackFade] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  //   const [error, setError] = useState(false);

  const handleSubmit = async () => {
    // event.preventDefault();
    // setBackFade(true);

    const { email, password } = credential;

    if (!email || !password) {
    } else {
      try {
        const { error, data } = await DoctorHttpClient.loginresponse(
          email.toLowerCase(),
          password
        );

        if (error) {
          toast.error(error.response?.data?.message);
        } else {
          toast.success(data?.message);
          const authenticatorFlag: boolean | undefined =
            data?.data?.isAuthenticatorEnable;
          const params = new URLSearchParams({
            email: email.toLowerCase(),
            isAuthenticatorEnable: String(authenticatorFlag),
          });
          router.push(
            `${
              authenticatorFlag ? "/2-step-verification" : "/verify-otp"
            }?${params.toString()}`
          );
        }
      } catch (err) {
        console.error(err);
        // setError(true);
        toast.error("Login failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push(ROUTES.DASHBOARD);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredential((prevCredential) => ({
      ...prevCredential,
      [name]: value,
    }));
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Box sx={styles.signInBoxStyle}>
        <Avatar sx={styles.avtarStyle}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={styles.boxformStyle}
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
            value={credential.email}
            onChange={handleChange}
            InputLabelProps={{
              style: { color: theme.palette.primary.main },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            value={credential.password}
            onChange={handleChange}
            InputLabelProps={{
              style: { color: theme.palette.primary.main },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={styles.signInButton}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </>
  );
};
