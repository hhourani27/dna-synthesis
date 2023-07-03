import { Fragment } from "react";

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
  const cols = [...Array(colSize).keys()].map((c) => c + 1);
  const rows = [...Array(rowSize).keys()].map((r) => r + 1);

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
            alignItems: "center",
            justifyItems: "center",
            gap: "10px",
          }}
        >
          {/* First row : column numbers */}
          <Box key={`r${1}c${1}`} sx={{ gridRow: "1", gridColumn: "1" }}>
            {" "}
          </Box>

          {cols.map((col) => (
            <Box
              key={`r${1}c${col + 1}`}
              sx={{ gridRow: "1", gridColumn: `${col + 1}` }}
            >
              {col}
            </Box>
          ))}
          {/* Row for each well array row */}
          {rows.map((row) => (
            <Fragment key={`r${row + 1}`}>
              {/* Row number */}
              <Box
                key={`r${row + 1}c${1}`}
                sx={{ gridRow: `${row + 1}`, gridColumn: "1" }}
              >
                {row}
              </Box>
              {/* Wells */}
              {cols.map((col) => (
                <Box
                  key={`r${row + 1}c${col + 1}`}
                  sx={{
                    gridRow: `${row + 1}`,
                    gridColumn: `${col + 1}`,
                    lineHeight: "0",
                  }}
                >
                  <Well />
                </Box>
              ))}
            </Fragment>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
