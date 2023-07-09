import { useState } from "react";
import { styled } from "@mui/material/styles";

import Fab from "@mui/material/Fab";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import DrawerMenu from "./DrawerMenu";
import Logo from "./logo/Logo";

const drawerWidth = 240;

const StyledDrawer = styled("aside")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: drawerWidth,

  position: "relative",

  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,

  padding: `0 ${theme.spacing(1)}`,
}));

const DrawerLogoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  height: theme.layout.header.height,
}));

const DrawerToggleFab = styled(Fab)(({ theme }) => ({
  position: "absolute",
  left: "100%",
  transform: `translateX(-50%) translateY(${theme.layout.header.height}) translateY(-50%)`,
  zIndex: 1,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
}));

export default function Drawer() {
  const [open, setOpen] = useState(false);

  return (
    <StyledDrawer>
      <DrawerLogoContainer>
        <Logo open={open} />
      </DrawerLogoContainer>
      <DrawerMenu open={open} />
      <DrawerToggleFab size="small">
        <ArrowBackIosNewIcon />
      </DrawerToggleFab>
    </StyledDrawer>
  );
}
