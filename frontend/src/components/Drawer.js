import { styled } from "@mui/material/styles";

import DrawerMenu from "./DrawerMenu";
import Logo from "./logo/Logo";

const drawerWidth = 240;

const StyledDrawer = styled("aside")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: drawerWidth,

  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,

  padding: `0 ${theme.spacing(1)}`,
}));

const DrawerLogoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  height: theme.layout.header.height,
}));

export default function Drawer() {
  return (
    <StyledDrawer>
      <DrawerLogoContainer>
        <Logo open />
      </DrawerLogoContainer>
      <DrawerMenu open />
    </StyledDrawer>
  );
}
