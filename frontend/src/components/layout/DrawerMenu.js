import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

import MicrowaveOutlinedIcon from "@mui/icons-material/MicrowaveOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const DrawerMenuList = styled("ul")(({ theme, open }) => ({
  display: "flex",
  flexDirection: "column",

  padding: theme.spacing(1),
  margin: `${theme.spacing(3)} 0 0`,
  listStyleType: "none",
}));

const DrawerMenuListItem = styled("div")(({ theme, open }) => ({
  minHeight: 48,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,

  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "nowrap",

  "&:hover, &:focus": { backgroundColor: theme.palette.primary.light },
  ".active &": { color: theme.palette.secondary.main },
}));

const DrawerMenuItemIcon = styled("span")(({ theme, open }) => ({
  color: "inherit",
  ...(open && { minWidth: 56 }),
}));
const DrawerMenuItemText = styled("span")(({ theme, open }) => ({}));

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

export default function DrawerMenu({ open }) {
  return (
    <nav>
      <DrawerMenuList>
        {drawerMenuItems.map((item) => (
          <li key={item.label}>
            <NavLink to={item.link}>
              <DrawerMenuListItem key={item.label} open={open}>
                <DrawerMenuItemIcon open={open}>{item.icon}</DrawerMenuItemIcon>
                {open && <DrawerMenuItemText>{item.label}</DrawerMenuItemText>}
              </DrawerMenuListItem>
            </NavLink>
          </li>
        ))}
      </DrawerMenuList>
    </nav>
  );
}
