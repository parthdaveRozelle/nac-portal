"use client";

import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { flexUtils } from "@/styles";
import papersgpLogo from "@/assets/papersgpLogo.png";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { SideBarItems } from "@/components";
import { IReactNode } from "@/interfaces";
import { ROUTES } from "@/constants";
import { useUserDetails } from "@/customhooks";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  resetOrganizationPermission,
  resetUserVerification,
  useAppDispatch,
} from "@/store";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    position: "fixed",
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiDrawer-paper": {
      width: "100%",
      position: "fixed",
      top: 0,
      right: 0,
      height: "100%",
      zIndex: theme.zIndex.drawer + 1,
      transition: "transform 0.3s ease",
      transform: open ? "translateX(0)" : "translateX(-100%)",
    },
  },
}));

export const DashboardProvider = ({ children }: IReactNode) => {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const user = useUserDetails();
  const dispatch = useAppDispatch();

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" open={open} sx={{ py: 0.5 }}>
          <Toolbar
            sx={{
              pr: "24px",
              [theme.breakpoints.down("sm")]: {
                ...flexUtils.flexJustifyBetween,
              },
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
                [theme.breakpoints.down("sm")]: { fontSize: "small" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Image
              src={papersgpLogo}
              alt="papersGP Logo"
              width={140}
              height={40}
              priority
              style={{ cursor: "pointer", objectFit: "contain" }}
              onClick={() => router.push(ROUTES.DASHBOARD)}
            />
            <Box
              sx={{
                ml: "auto",
                mr: 2,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Avatar alt="N" sx={{ color: "white", mb: 0.6 }} />
              {user?.email && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "secondary.main",
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  {user.email}
                </Typography>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            "& .MuiDrawer-paper": {
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <Toolbar
            sx={{
              ...flexUtils.flexEnd,
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <Divider />

          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
            }}
          >
            <List component="nav">
              <SideBarItems />
            </List>
          </Box>

          <Divider />

          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              endIcon={open ? <LogoutIcon sx={{ ml: 2 }} /> : undefined}
              onClick={() => {
                dispatch(resetUserVerification());
                dispatch(resetOrganizationPermission());
                router.push(ROUTES.LOGIN);
              }}
              sx={{
                justifyContent: "center",
                minWidth: 0,
                px: open ? 2 : 1,
              }}
            >
              {open ? "Logout" : <LogoutIcon />}
            </Button>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",

            [theme.breakpoints.down("sm")]: {
              px: 1,
              pt: 8,
            },
          }}
        >
          <Toolbar />

          <Container
            maxWidth="lg"
            sx={{
              mt: 4,
              mb: 4,
            }}
          >
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
};
