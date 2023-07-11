import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import Well from "./Well";

export default function WellArray({
  wellArraySize,
  wells,
  selectedWellId,
  onWellSelection,
  onWellDeselection,
}) {
  const handleMouseClick = (wellId) => {
    if (selectedWellId === wellId) {
      onWellDeselection();
    } else {
      onWellSelection(wellId);
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
      {/* (1) First row : column numbers */}
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

      {/* (2) First column : row numbers*/}
      {gridRows.map((row) => (
        <Box
          key={`r${row + 1}c${1}`}
          sx={{ gridRow: `${row + 1}`, gridColumn: "1" }}
        >
          {row}
        </Box>
      ))}

      {/* (3) Display wells on the grid*/}
      {wells.map((w) => {
        const [gRow, gCol] = [w.row + 2, w.col + 2]; //The row & col number on the grid

        return (
          <Box
            key={`r${gRow}c${gCol}`}
            sx={{
              gridRow: `${gRow}`,
              gridColumn: `${gCol}`,
              lineHeight: "0",
              outline:
                selectedWellId != null && selectedWellId === w.id
                  ? `dotted ${selectionColor} 4px`
                  : 0,
              cursor: "pointer",
            }}
            onClick={() => handleMouseClick(w.id)}
          >
            {w.status === "IDLE" ? (
              <Well idle />
            ) : (
              <Well
                status={w.status}
                completedCycles={w.synthetizedNucleotideCount}
                totalCycles={w.totalCycles}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}
