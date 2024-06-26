import { Fragment, useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Well from "./Well";

const GridSequenceTable = styled("div")(({ theme }) => ({
  display: "grid",
  alignItems: "stretch",

  position: "relative",
  letterSpacing: theme.typography.sequence.letterSpacing,

  "& > div": {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

  "& > .sequence-text-container": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  "& .progress": {
    lineHeight: 0,
  },

  "& .synthetized": {
    color: theme.palette.secondary.main,
    fontWeight: 600,
    paddingLeft: 16,
  },

  "& .synthetized.completed": {
    color: theme.palette.success.main,
  },

  "& .non-synthetized": {
    color: theme.palette.text.secondary,
    fontWeight: 400,
  },

  "& > div:nth-of-type(3n)": {
    borderLeft: `2px solid ${theme.palette.success.main}`,
  },
}));

const splitOligo = (oligo, completedCycles) => ({
  synthethizedNucleotides: oligo.substring(0, completedCycles),
  nonSynthethizedNucleotides: oligo.substring(completedCycles),
});

export default function WellSequenceList({ wells, selectedWellId, sorted }) {
  let wellsDisplayObjects = wells.map((w) => {
    const { synthethizedNucleotides, nonSynthethizedNucleotides } = splitOligo(
      w.oligo,
      w.synthetizedNucleotideCount
    );

    const oligoIsCompleted = w.synthetizedNucleotideCount === w.totalCycles;

    return {
      synthethizedNucleotides,
      nonSynthethizedNucleotides,
      oligoIsCompleted,
      ...w,
    };
  });

  if (sorted === true) {
    wellsDisplayObjects.sort((a, b) => a.oligo.length - b.oligo.length);
  }

  // Feature : automatically scroll to well & sequence when selected
  const wellsRefs = useRef({});
  useEffect(() => {
    if (selectedWellId !== null) {
      if (wellsRefs.current[selectedWellId] !== null) {
        console.info(`Scrolling to well ${selectedWellId}.`);
        wellsRefs.current[selectedWellId].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        console.info(
          `Cannot scroll to well ${selectedWellId}. Couldn't find it in the given well list`
        );
      }
    }
  });

  const theme = useTheme();
  const selectionColor = theme.palette.success.main;

  return (
    <GridSequenceTable>
      {wellsDisplayObjects.map((w, widx) => {
        const gRow = widx + 1;

        return (
          <Fragment key={w.id}>
            <Box
              sx={{
                gridRow: gRow,
                gridColumn: 1,
                outline:
                  selectedWellId != null && selectedWellId === w.id
                    ? `dotted ${selectionColor} 4px`
                    : 0,
              }}
              className="progress"
              ref={(el) => (wellsRefs.current[w.id] = el)}
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
            <Box
              sx={{ gridRow: gRow, gridColumn: 2 }}
              className="sequence-text-container"
            >
              <div
                className={`synthetized ${
                  w.oligoIsCompleted ? "completed" : ""
                }`}
              >
                {w.synthethizedNucleotides ? w.synthethizedNucleotides : " "}
              </div>
            </Box>
            <Box
              sx={{ gridRow: gRow, gridColumn: 3 }}
              className="sequence-text-container"
            >
              <div className="non-synthetized">
                {w.nonSynthethizedNucleotides
                  ? w.nonSynthethizedNucleotides
                  : " "}
              </div>
            </Box>
          </Fragment>
        );
      })}
    </GridSequenceTable>
  );
}
