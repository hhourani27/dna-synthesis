import { useState } from "react";

import { styled } from "@mui/material/styles";
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
  const [searchSequence, setSearchSequence] = useState("");

  const handleSearchInputChange = (value) => {
    const valueUpperCase = value.toUpperCase();

    if ([...valueUpperCase].every((c) => ["A", "T", "C", "G"].includes(c))) {
      setSearchSequence(valueUpperCase);
    }
  };

  return (
    <WellSequencesContainer>
      <WellSequencesBar>
        <TextField
          id="sequence-search"
          label="Search sequence"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={searchSequence}
          onChange={(e) => handleSearchInputChange(e.target.value)}
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
          wells={wells}
          selectedWellId={selectedWellId}
          sorted={sorted}
          filterSequence={searchSequence.length >= 3 ? searchSequence : null}
        />
      </WellSequencesListContainer>
    </WellSequencesContainer>
  );
}
