"use client";

import { SIDEBAR_ITEMS } from "@/constants";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export const SideBarItems = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      {SIDEBAR_ITEMS.map((sidebarItem) => (
        <ListItemButton
          key={sidebarItem.text}
          onClick={() => router.push(sidebarItem.route)}
          selected={pathname === sidebarItem.route}
        >
          <ListItemIcon>
            <sidebarItem.icon color="primary" />
          </ListItemIcon>
          <ListItemText color="primary">
            <Typography color="primary">{sidebarItem.text}</Typography>
          </ListItemText>
        </ListItemButton>
      ))}
    </>
  );
};
