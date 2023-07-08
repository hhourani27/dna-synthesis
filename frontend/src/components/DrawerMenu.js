import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MicrowaveOutlinedIcon from "@mui/icons-material/MicrowaveOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useNavigate } from "react-router-dom";

export default function DrawerMenu({ open }) {
  const drawerMenuItems = [
    {
      label: "Machines",
      icon: <MicrowaveOutlinedIcon />,
      link: "/machines",
    },
    {
      label: "Orders",
      icon: <ReceiptLongOutlinedIcon />,
      link: "/orders",
    },
    {
      label: "Dashboard",
      icon: <AssessmentOutlinedIcon />,
      link: "/analytics",
    },
    {
      label: "Onboarding",
      icon: <InfoOutlinedIcon />,
      link: "/onboarding",
    },
  ];

  let navigate = useNavigate();

  return (
    <List>
      {drawerMenuItems.map((item) => (
        <ListItem key={item.label}>
          <ListItemButton
            onClick={() => {
              navigate(item.link);
            }}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              "&:hover, &:focus": { bgcolor: "primary.light" },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "inherit",
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
