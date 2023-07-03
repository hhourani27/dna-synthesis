import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PaperMUI from "@mui/material/Paper";
import Container from "@mui/material/Container";

import Grid from "@mui/material/Grid";

import { useParams } from "react-router-dom";

import Well from "./Well";

const Paper = styled(PaperMUI)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  padding: theme.spacing(1),
  //   textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function MachinePage() {
  const { id } = useParams();

  const cols = [
    " ",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const rows = ["1", "2", "3", "4", "5", "6", "7", "8"];

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Paper elevation={1}>
        <h2>Machine card {id}</h2>
      </Paper>
      <Paper elevation={1}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* First row : column numbers */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {cols.map((col) => (
              <Box
                key={col}
                sx={{
                  display: "block",
                  //   height: "30px",
                  /* set values of flexGrow, flexShrink & flexBasis so that flex-items have always the same width (see https://stackoverflow.com/a/29503264/471461)*/
                  flexGrow: "1",
                  flexShrink: "1",
                  flexBasis: "0px",
                  textAlign: "center",
                }}
              >
                {col}
              </Box>
            ))}
          </Box>
          {/* Row for each well array row */}
          {rows.map((row) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "stretch",
              }}
            >
              {/* Row number */}
              <Box
                sx={{
                  display: "block",
                  //   height: "30px",
                  /* set values of flexGrow, flexShrink & flexBasis so that flex-items have always the same width (see https://stackoverflow.com/a/29503264/471461)*/
                  flexGrow: "1",
                  flexShrink: "1",
                  flexBasis: "0px",
                  textAlign: "center",
                }}
              >
                {row}
              </Box>
              {/* Wells */}
              {cols.map((col) => (
                <Box
                  key={col}
                  sx={{
                    display: "block",
                    /* set values of flexGrow, flexShrink & flexBasis so that flex-items have always the same width (see https://stackoverflow.com/a/29503264/471461)*/
                    flexGrow: "1",
                    flexShrink: "1",
                    flexBasis: "0px",
                    textAlign: "center",
                  }}
                >
                  <Well />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
