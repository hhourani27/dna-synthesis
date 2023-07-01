import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MicrowaveIcon from "@mui/icons-material/Microwave";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import InfoIcon from "@mui/icons-material/Info";

export default function DrawerMenu({ open }) {
  const drawerMenuItems = [
    {
      label: "Machines",
      icon: <MicrowaveIcon />,
    },
    {
      label: "Orders",
      icon: <ReceiptLongIcon />,
    },
    {
      label: "Dashboard",
      icon: <AnalyticsIcon />,
    },
    {
      label: "Onboarding",
      icon: <InfoIcon />,
    },
  ];

  return (
    <List>
      {drawerMenuItems.map((item, index) => (
        <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
