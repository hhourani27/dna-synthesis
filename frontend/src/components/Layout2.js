import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { styled, ThemeProvider } from "@mui/material/styles";

import { Outlet } from "react-router-dom";

import { theme } from "../style/Theme";
import DrawerMenu from "./DrawerMenu";
import Logo from "./Logo";

const drawerWidth = 240;
const headerHeight = { xs: 56, sm: 64 };

const RootContainer = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100%",
}));

const Drawer = styled("aside")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: drawerWidth,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const MainContainer = styled("div")(({ theme }) => ({
  flex: 1,
  flexGrow: 1,
  overflow: "auto",
}));

const TopBar = styled("header")(({ theme }) => ({
  position: "sticky",
  top: 0,
  backgroundColor: "white",
  height: theme.layout.header.height,
}));

const MainContent = styled("main")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

export default function Layout2() {
  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <CssBaseline />
        <Drawer>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: headerHeight,
            }}
          >
            <Logo open />
          </Box>
          <Divider />
          <DrawerMenu open />
        </Drawer>
        <MainContainer>
          <TopBar>Header content</TopBar>
          <MainContent>
            <Outlet />
          </MainContent>
        </MainContainer>
      </RootContainer>
    </ThemeProvider>
  );
}
