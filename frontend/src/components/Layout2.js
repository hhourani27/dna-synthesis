import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
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

import { ThemeProvider } from "@mui/material/styles";

import { Outlet } from "react-router-dom";

import { theme } from "../style/Theme";
import DrawerMenu from "./DrawerMenu";
import Logo from "./Logo";

const drawerWidth = 240;
const headerHeight = { xs: 56, sm: 64 };

export default function Layout2() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: drawerWidth,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            px: 3,
          }}
        >
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
        </Box>
        <Box>
          <AppBar
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
          </AppBar>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
