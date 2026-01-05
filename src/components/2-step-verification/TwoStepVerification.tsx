"use client";

import { loginType, TOKEN } from "@/constants";
import { ROUTES, REGEX_NUMBER } from "@/constants";
import { DoctorHttpClient } from "@/services";
import { useAppDispatch, VerifyDoctor } from "@/store";
import { twoStepVerificationStyle as styles } from "@/styles";
import { createEmptyArray } from "@/utils";
import LockIcon from "@mui/icons-material/Lock";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const TwoStepVerification = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const isAuthenticatorEnable = searchParams.get("isAuthenticatorEnable");
  const authenticatorFlag = isAuthenticatorEnable === "true";

  const [otp, setOtp] = useState<string[]>(createEmptyArray(6));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const arrayToString = (otpArray: string[]): string => {
    return otpArray.join("");
  };

  const handleOnSubmitOtp = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const user = {
      email: email,
      deviceId: "",
      deviceType: "WEB",
      verificationCode: arrayToString(otp),
      router,
      loginType: authenticatorFlag ? loginType["2FA_AUTH"] : loginType.OTP,
    };
    dispatch(VerifyDoctor(user));
  };

  const handleChange = (index: number, value: string) => {
    if (REGEX_NUMBER.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLElement>
  ) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleUseOtpInstead = async () => {
    const { error, data } = await DoctorHttpClient.resendOtpVerification(email);
    if (error) {
      toast.error(error.response?.data?.message);
    } else {
      toast.success(data?.message);
      router.push(
        `${
          ROUTES.VERIFY_OTP
        }?email=${email.toLowerCase()}&isAuthenticatorEnable=false`
      );
    }
  };

  useEffect(() => {
    if (localStorage.getItem(TOKEN)) {
      router.push(ROUTES.DASHBOARD);
    }
  }, []);
  return (
    <>
      <Box sx={styles.mainBox}>
        <Avatar sx={styles.avtarStyle}>
          <LockIcon sx={styles.lockIconStyle} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Google Authenticator Verification
        </Typography>

        <Box sx={styles.otpMainBox}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              variant="outlined"
              inputProps={{
                maxLength: 1,
              }}
            />
          ))}
        </Box>

        <Box component="form" noValidate sx={styles.submitBox}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleOnSubmitOtp}
            sx={styles.submitStyle}
          >
            Submit
          </Button>

          <Grid container justifyContent="space-between">
            <Grid size={6}>
              <Link
                variant="body2"
                onClick={handleUseOtpInstead}
                sx={styles.verifyOtpLink}
              >
                Use OTP Instead?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
