"use client";

import { useUserDetails } from "@/customhooks";
import { Box, Grid, Paper, Typography } from "@mui/material";
import MedicationIcon from "@mui/icons-material/Medication";
import WarningIcon from "@mui/icons-material/Warning";
import InventoryIcon from "@mui/icons-material/Inventory";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

export const Dashboard = () => {
  const user = useUserDetails();
  const router = useRouter();

  return (
    <>
      <Typography
        sx={{ mt: 1 }}
        variant="body1"
        color="primary"
        fontWeight={600}
      >
        NAC Guidelines Dashboard
      </Typography>
      <Typography sx={{ mt: 2 }} variant="h4" fontWeight={550}>
        Welcome back,
        {user?.doctorName && (
          <Typography
            color="secondary.main"
            variant="h4"
            fontWeight={550}
            component={"span"}
            sx={{ ml: 1 }}
          >
            Dr. {user.doctorName}
          </Typography>
        )}{" "}
      </Typography>
      <Typography sx={{ mt: 1 }} variant="body1" color="grey" fontWeight={500}>
        Manage asthma medications and therapy recommendations
      </Typography>
      <Box sx={{ mt: 4, backgroundColor: "white", p: 2 }}>
        <Typography variant="body1">Medication Overview</Typography>
        <Grid container spacing={3} sx={{ mt: 1.5 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={3}>
                <MedicationIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Total Medications
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    128
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active in system
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={3}>
                <WarningIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Unavailable
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    14
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Supply issues
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={1}>
                <InventoryIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    AIR Eligible
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    22
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Anti-Inflammatory Reliever
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={1}>
                <TrendingUpIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    MART Eligible
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    9
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Maintenance And Reliever
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Grid container spacing={3} sx={{ mt: 1.5 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ cursor: "pointer" }}>
            <Paper
              elevation={3}
              sx={{ p: 2 }}
              onClick={() => router.push(ROUTES.MEDICATIONS)}
            >
              <Typography variant="subtitle1" fontWeight={500}>
                Medications
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                128
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ cursor: "pointer" }}>
            <Paper
              elevation={3}
              sx={{ p: 2 }}
              onClick={() => router.push(ROUTES.GUIDELINES)}
            >
              <Typography variant="subtitle1" fontWeight={500}>
                Guidelines
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                47
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ cursor: "pointer" }}>
            <Paper
              elevation={3}
              sx={{ p: 2 }}
              onClick={() => router.push(ROUTES.SYNC)}
            >
              <Typography variant="subtitle1" fontWeight={500}>
                AMT Updates
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                3
              </Typography>
            </Paper>
          </Grid>

          <Grid
            size={{ xs: 12, sm: 6, md: 3 }}
            sx={{ cursor: "pointer" }}
            onClick={() => router.push(ROUTES.AUDIT)}
          >
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight={500}>
                PBS Changes
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                12
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
