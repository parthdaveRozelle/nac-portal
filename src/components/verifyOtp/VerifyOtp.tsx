"use client";

import { loginType, ROUTES, TOKEN } from "@/constants";
import { DoctorHttpClient } from "@/services";
import { useAppDispatch, VerifyDoctor } from "@/store";
import { verifyOtpStyle as styles } from "@/styles";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const VerifyOtp = () => {
  const theme = useTheme();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(30);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const isAuthenticatorEnable =
    searchParams.get("isAuthenticatorEnable") || "false";
  const authenticatorFlag = isAuthenticatorEnable === "false";

  useEffect(() => {
    let countdown: NodeJS.Timeout;

    if (resendDisabled && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (timer === 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(countdown);
  }, [timer, resendDisabled]);

  const handleOnSubmitOtp = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const user = {
      email: email,
      deviceId: "",
      deviceType: "WEB",
      verificationCode: otp,
      router: router,
      loginType: authenticatorFlag ? loginType.OTP : loginType["2FA_AUTH"],
    };

    dispatch(VerifyDoctor(user));
    setResendDisabled(true);
    setTimer(30);
  };

  const handleOnResendOtp = async () => {
    const { error, data } = await DoctorHttpClient.resendOtpVerification(email);
    if (error) {
      toast.error(error.response?.data?.message);
    } else {
      toast.success(data?.message);
      setResendDisabled(true);
      setTimer(30);
    }
  };

  useEffect(() => {
    if (localStorage.getItem(TOKEN)) {
      router.push(ROUTES.DASHBOARD);
    }
  }, []);

  return (
    <>
      <Box sx={styles.gridBoxStyle}>
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <SendToMobileIcon sx={styles.font} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verify OTP
        </Typography>
        <Box component="form" noValidate sx={styles.boxStyle}>
          <TextField
            margin="normal"
            type="text"
            required
            fullWidth
            id="otp"
            label="OTP"
            name="otp"
            autoComplete="otp"
            autoFocus
            value={otp}
            InputLabelProps={{
              style: { color: theme.palette.primary.main, width: "100%" },
            }}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 6) {
                setOtp(value);
              }
            }}
            inputProps={{
              maxLength: 6,
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleOnSubmitOtp}
            sx={styles.submitStyle}
          >
            Submit
          </Button>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid>
              <Link
                variant="body2"
                onClick={() => router.push(ROUTES.LOGIN)}
                sx={styles.cursorPointer}
              >
                Sign in
              </Link>
            </Grid>

            <Grid>
              {resendDisabled ? (
                <Typography variant="body2">
                  Resend OTP in {timer} seconds
                </Typography>
              ) : (
                <Link
                  onClick={handleOnResendOtp}
                  variant="body2"
                  sx={styles.cursorPointer}
                >
                  Resend OTP
                </Link>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
