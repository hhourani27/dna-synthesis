import { Fragment } from "react";

import Box from "@mui/material/Box";

import Well from "./Well";

export default function WellArray({ rowSize, colSize }) {
  const cols = [...Array(colSize).keys()].map((c) => c + 1);
  const rows = [...Array(rowSize).keys()].map((r) => r + 1);

  return (
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
  );
}
