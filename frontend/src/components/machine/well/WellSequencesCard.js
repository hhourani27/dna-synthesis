import { useState } from "react";

import { styled, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import SortIcon from "@mui/icons-material/Sort";
import Tooltip from "@mui/material/Tooltip";

import WellSequenceList from "./WellSequenceList";

const WellSequencesContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  height: "100%",
}));

const WellSequencesBar = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(5),

  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.appBar,
  padding: `0 ${theme.spacing(2)}`,

  position: "sticky",
  top: 0,
}));

const WellSequencesListContainer = styled("div")(({ theme }) => ({
  height: "100%",
  overflow: "auto",
}));

export default function WellSequencesCard({ wells, selectedWellId }) {
  const [sorted, setSorted] = useState(false);
  const [filterSequence, setFilterSequence] = useState("");

  const handleFilterInputChange = (value) => {
    const valueUpperCase = value.toUpperCase();

    if ([...valueUpperCase].every((c) => ["A", "T", "C", "G"].includes(c))) {
      setFilterSequence(valueUpperCase);
    }
  };

  const filteredWells = wells.filter((w) => w.oligo.includes(filterSequence));
  const filterError =
    selectedWellId === null
      ? false
      : !filteredWells.map((w) => w.id).includes(selectedWellId);
  const FILTER_ERROR_MSG =
    "This filter is preventing you from displaying the selected well. Remove your filter query.";

  const theme = useTheme();

  return (
    <WellSequencesContainer>
      <WellSequencesBar>
        <TextField
          id="sequence-filter"
          label="Filter sequence"
          variant="standard"
          value={filterSequence}
          onChange={(e) => handleFilterInputChange(e.target.value)}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            sx: { letterSpacing: theme.typography.sequence.letterSpacing },
          }}
          sx={{ flexGrow: 1 }}
          {...(filterError === true
            ? { error: true, helperText: FILTER_ERROR_MSG }
            : {})}
        />
        <ToggleButton
          value="check"
          size="small"
          selected={sorted}
          onChange={() => {
            setSorted((sorted) => !sorted);
          }}
        >
          <Tooltip title="Sort by oligo length" placement="top" arrow>
            <SortIcon
              sx={{
                // Flip the icon so that it appears in ascending order
                transform: "scaleY(-1)",
              }}
            />
          </Tooltip>
        </ToggleButton>
      </WellSequencesBar>
      <WellSequencesListContainer>
        <WellSequenceList
          wells={filteredWells}
          selectedWellId={selectedWellId}
          sorted={sorted}
        />
      </WellSequencesListContainer>
    </WellSequencesContainer>
  );
}
