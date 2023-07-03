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

  const [rowSize, colSize] = [8, 12];
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
        {/* The grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "repeat(9,1fr)",
            gridTemplateColumns: "repeat(13,1fr)",
          }}
        >
          {/* First row : column numbers */}
          {cols.map((col, ic) => (
            <Box key={col} sx={{ gridRow: "1", gridColumn: `${ic + 1}` }}>
              c{col}
            </Box>
          ))}
          {/* Row for each well array row */}
          {rows.map((row, ir) => (
            <>
              {/* Row number */}
              <Box sx={{ gridRow: `${ir + 2}`, gridColumn: "1" }}>r{row}</Box>
              {/* Wells */}
              {cols.map((col, ic) => (
                <Box
                  key={col}
                  sx={{ gridRow: `${ir + 2}`, gridColumn: `${ic + 2}` }}
                >
                  <Well />
                </Box>
              ))}
            </>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
