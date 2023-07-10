import { Fragment, useState } from "react";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import Well from "./Well";

export default function WellArray({
  wellArraySize,
  wells,
  selectedWell,
  onWellSelection,
  onWellDeselection,
}) {
  const SELECTION_MODES = {
    HOVER: "HOVER",
    CLICK: "CLICK",
  };

  const [selectionMode, setSelectionMode] = useState(SELECTION_MODES.HOVER);

  const handleMouseEnter = (wellArrayRow, wellArrayCol) => {
    if (selectionMode === SELECTION_MODES.HOVER) {
      onWellSelection(wellArrayRow, wellArrayCol);
    }
  };

  const handleMouseLeave = () => {
    if (selectionMode === SELECTION_MODES.HOVER) {
      onWellDeselection();
    }
  };

  const handleMouseClick = (wellArrayRow, wellArrayCol) => {
    if (selectionMode === SELECTION_MODES.HOVER) {
      setSelectionMode(SELECTION_MODES.CLICK);
    } else {
      setSelectionMode(SELECTION_MODES.HOVER);
    }
  };

  const [wellArrayRowSize, wellArrayColSize] = wellArraySize;
  const gridCols = [...Array(wellArrayColSize).keys()].map((c) => c + 1);
  const gridRows = [...Array(wellArrayRowSize).keys()].map((r) => r + 1);

  const theme = useTheme();
  const selectionColor = theme.palette.success.main;

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
                  selectedWell != null &&
                  selectedWell[0] === row - 1 &&
                  selectedWell[1] === col - 1
                    ? selectionMode === SELECTION_MODES.HOVER
                      ? `dotted ${selectionColor} 4px`
                      : `solid ${selectionColor} 4px`
                    : 0,
              }}
              onMouseEnter={() => handleMouseEnter(row - 1, col - 1)}
              onMouseLeave={() => handleMouseLeave()}
              onClick={() => handleMouseClick(row - 1, col - 1)}
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
                />
              )}
            </Box>
          ))}
        </Fragment>
      ))}
    </Box>
  );
}
