import { Fragment, useState } from "react";

import Box from "@mui/material/Box";

import Well from "./Well";

export default function WellArray({
  wellArrayRowSize,
  wellArrayColSize,
  wells,
}) {
  const [selection, setSelection] = useState({ event: null, well: [-1, -1] });

  const handleMouseEnter = (wellArrayRow, wellArrayCol) => {
    setSelection({ event: "HOVER", well: [wellArrayRow, wellArrayCol] });
  };

  const handleMouseLeave = () => {
    setSelection({ event: null, well: [-1, -1] });
  };

  const gridCols = [...Array(wellArrayColSize).keys()].map((c) => c + 1);
  const gridRows = [...Array(wellArrayRowSize).keys()].map((r) => r + 1);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: `repeat(${wellArrayRowSize + 1},1fr)`,
        gridTemplateColumns: `repeat(${wellArrayColSize + 1},1fr)`,
        alignItems: "center",
        justifyItems: "center",
        gap: "10px",
      }}
    >
      {/* First row : column numbers */}
      <Box key={`r${1}c${1}`} sx={{ gridRow: "1", gridColumn: "1" }}>
        {" "}
      </Box>

      {gridCols.map((col) => (
        <Box
          key={`r${1}c${col + 1}`}
          sx={{ gridRow: "1", gridColumn: `${col + 1}` }}
        >
          {col}
        </Box>
      ))}
      {/* Row for each well array row */}
      {gridRows.map((row) => (
        <Fragment key={`r${row + 1}`}>
          {/* Row number */}
          <Box
            key={`r${row + 1}c${1}`}
            sx={{ gridRow: `${row + 1}`, gridColumn: "1" }}
          >
            {row}
          </Box>
          {/* Wells */}
          {gridCols.map((col) => (
            <Box
              key={`r${row + 1}c${col + 1}`}
              sx={{
                gridRow: `${row + 1}`,
                gridColumn: `${col + 1}`,
                lineHeight: "0",
                outline:
                  selection.event != null &&
                  selection.well[0] === row - 1 &&
                  selection.well[1] === col - 1
                    ? "solid black 1px"
                    : 0,
              }}
            >
              {wells[row - 1][col - 1].status === "IDLE" ? (
                <Well idle />
              ) : (
                <Well
                  status={wells[row - 1][col - 1].status}
                  completedCycles={
                    wells[row - 1][col - 1].synthetizedNucleotideCount
                  }
                  totalCycles={wells[row - 1][col - 1].totalCycles}
                  onMouseEnter={() => handleMouseEnter(row - 1, col - 1)}
                  onMouseLeave={() => handleMouseLeave()}
                />
              )}
            </Box>
          ))}
        </Fragment>
      ))}
    </Box>
  );
}
