import CssBaseline from "@mui/material/CssBaseline";

import { styled, ThemeProvider } from "@mui/material/styles";

import { Outlet } from "react-router-dom";

import { theme } from "../../style/Theme";

import Drawer from "./Drawer";
import TopBar from "./TopBar";

const RootContainer = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100%",
}));

const MainContainer = styled("div")(({ theme }) => ({
  flex: 1,
  flexGrow: 1,
  overflow: "auto",
}));

const MainContent = styled("main")(({ theme }) => ({
  maxWidth: 1500,
  margin: "auto",
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
          <TopBar />
          <MainContent>
            <Outlet />
          </MainContent>
        </MainContainer>
      </RootContainer>
    </ThemeProvider>
  );
}
