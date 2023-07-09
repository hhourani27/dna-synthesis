import { useState } from "react";
import { styled } from "@mui/material/styles";

import Fab from "@mui/material/Fab";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import DrawerMenu from "./DrawerMenu";
import Logo from "./logo/Logo";

const StyledDrawer = styled("aside")(({ theme, open }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 0,
  flexShrink: 0,

  position: "relative",
  /* Had to add width so that transition animation works.
  In CSS transition do not apply to auto properties
  */
  width: theme.layout.drawer.opened.width,

  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: 0,

  ...(open && {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),

  ...(!open && {
    /* Had to add width so that transition animation works.
     In CSS transition do not apply to auto properties
  */
    width: theme.layout.drawer.closed.width,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
}));

const DrawerLogoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  height: theme.layout.header.height,
  // TODO : review the logo padding
  padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
}));

const DrawerToggleFab = styled(Fab)(({ theme, open }) => ({
  position: "absolute",
  left: "100%",
  transform: `translateX(-50%) translateY(${
    theme.layout.header.height
  }) translateY(-50%) rotate(${open ? 0 : 180}deg)`,
  zIndex: 1,

  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",

  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.complex,
  }),
}));

export default function Drawer() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen((open) => !open);

  return (
    <StyledDrawer open={open}>
      <DrawerLogoContainer>
        <Logo open={open} />
      </DrawerLogoContainer>
      <DrawerMenu open={open} />
      <DrawerToggleFab size="small" open={open} onClick={toggleDrawer}>
        <ArrowBackIosNewIcon />
      </DrawerToggleFab>
    </StyledDrawer>
  );
}
