"use client";

import { ROUTES, TOKEN } from "@/constants";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginStyle as styles } from "@/styles";
import { useRouter } from "next/navigation";
import { DoctorHttpClient } from "@/services";
import { toastError } from "@/utils";

export const Login = () => {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = credential;

    if (!email || !password) {
      setLoading(false);
      return toast.error("Credentials are required");
    }

    const { error, data } = await DoctorHttpClient.loginresponse(
      email.toLowerCase(),
      password
    );

    if (error || !data) {
      setLoading(false);
      return toastError(error);
    }

    toast.success(data.message);
    setLoading(false);
    const authenticatorFlag = data.data.isAuthenticatorEnable;
    const params = new URLSearchParams({
      email: email.toLowerCase(),
      isAuthenticatorEnable: String(authenticatorFlag),
    });
    router.push(
      `${
        authenticatorFlag ? "/2-step-verification" : "/verify-otp"
      }?${params.toString()}`
    );
  };

  useEffect(() => {
    if (localStorage.getItem(TOKEN)) {
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
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>
      </Box>
    </>
  );
};
