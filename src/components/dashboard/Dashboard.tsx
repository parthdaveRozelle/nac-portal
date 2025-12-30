"use client";

import { Typography } from "@mui/material";

export const Dashboard = () => {
  return (
    <>
      <Typography variant="h4" fontWeight={550}>
        NAC Guidelines Dashboard !!
      </Typography>
      <Typography
        sx={{ mt: 0.5 }}
        variant="body1"
        color="grey"
        fontWeight={500}
      >
        Manage asthma medications and therapy recommendations
      </Typography>
    </>
  );
};
