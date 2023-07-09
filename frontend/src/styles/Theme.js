import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#12131c",
      contrastText: "#fcfcfc",
    },
    secondary: {
      main: "#c4c7fa",
    },
    background: {
      default: "#f8f8f8",
    },
  },
  typography: {
    fontFamily: "Quicksand, Roboto, Helvetica, sans-serif",
  },

  layout: {
    header: {
      height: "56px",
    },
    drawer: {
      opened: {
        width: "240px",
      },
      closed: {
        width: "72px",
      },
    },
  },
});
