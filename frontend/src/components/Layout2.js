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

import Drawer from "./Drawer";

const RootContainer = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100%",
}));

const MainContainer = styled("div")(({ theme }) => ({
  flex: 1,
  flexGrow: 1,
  overflow: "auto",
}));

const TopBar = styled("header")(({ theme }) => ({
  position: "sticky",
  top: 0,
  backgroundColor: theme.palette.background.paper,
  height: theme.layout.header.height,
}));

const MainContent = styled("main")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
}));

export default function Layout2() {
  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <CssBaseline />
        <Drawer />
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
