import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MicrowaveIcon from "@mui/icons-material/Microwave";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import InfoIcon from "@mui/icons-material/Info";

import { useNavigate } from "react-router-dom";

export default function DrawerMenu({ open }) {
  const drawerMenuItems = [
    {
      label: "Machines",
      icon: <MicrowaveIcon />,
      link: "/machines",
    },
    {
      label: "Orders",
      icon: <ReceiptLongIcon />,
      link: "/orders",
    },
    {
      label: "Dashboard",
      icon: <AnalyticsIcon />,
      link: "/analytics",
    },
    {
      label: "Onboarding",
      icon: <InfoIcon />,
      link: "/onboarding",
    },
  ];

  let navigate = useNavigate();

  return (
    <List>
      {drawerMenuItems.map((item) => (
        <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => {
              navigate(item.link);
            }}
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
