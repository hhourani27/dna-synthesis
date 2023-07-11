import WellSequences from "./WellSequenceList";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import SortIcon from "@mui/icons-material/Sort";

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

  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.appBar,
  position: "sticky",
  top: 0,
}));

const WellSequencesListContainer = styled("div")(({ theme }) => ({
  height: "100%",
  overflow: "auto",
}));

export default function WellSequencesCard({ wells, selectedWellId }) {
  return (
    <WellSequencesContainer>
      <WellSequencesBar>
        <TextField id="sequence-search" label="ATCG..." variant="standard" />
        <ToggleButton
          value="check"
          size="small"
          //   selected={selected}
          //   onChange={() => {
          //     setSelected(!selected);
          //   }}
        >
          <SortIcon />
        </ToggleButton>
      </WellSequencesBar>
      <WellSequencesListContainer>
        <WellSequences wells={wells} selectedWellId={selectedWellId} />
      </WellSequencesListContainer>
    </WellSequencesContainer>
  );
}
