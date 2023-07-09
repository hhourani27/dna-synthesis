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

const Drawer = styled("aside")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: drawerWidth,
  // width: drawerWidth,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  // paddingX: 3,
}));

const Container = styled("div")(({ theme }) => ({
  flex: 1,
  overflow: "auto",
}));

const TopBar = styled("header")(({ theme }) => ({
  position: "sticky",
  top: 0,
  backgroundColor: "white",
  height: "56px",
}));

export default function Layout2() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", height: "100%", margin: "0" }}>
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
        <Container>
          <TopBar>Header content</TopBar>
          {/* <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
            }}
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Permanent drawer
              </Typography>
            </Toolbar>
          </AppBar> */}
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            <Outlet />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
