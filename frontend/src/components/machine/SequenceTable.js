import { Fragment } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Well from "./Well";

const GridSequenceTable = styled("div")(({ theme, wellArraySize }) => ({
  display: "grid",
  gridTemplateRows: `repeat(${wellArraySize},1fr)`,
  alignItems: "stretch",
  // gap: `8px 0px`,

  position: "relative",
  letterSpacing: 7,

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
    paddingRight: 16,
    lineHeight: 0,
  },

  "& .completed": {
    color: theme.palette.success.main,
    fontWeight: 600,
  },

  "& .synthetized": {
    color: theme.palette.secondary.main,
    fontWeight: 600,
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

export default function SequenceTable({ wellArraySize, wells }) {
  const wellsDisplay = wells.map((w) => {
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

  return (
    <GridSequenceTable wellArraySize={wellArraySize[0] * wellArraySize[1]}>
      {wellsDisplay.map((w) => {
        const gRow = w.id + 1;

        return (
          <Fragment key={w.id}>
            <Box
              sx={{
                gridRow: gRow,
                gridColumn: 1,
              }}
              className="progress"
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
              <div className={w.oligoIsCompleted ? "completed" : "synthetized"}>
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
