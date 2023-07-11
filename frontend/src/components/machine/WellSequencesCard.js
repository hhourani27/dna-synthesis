import WellSequences from "./WellSequences";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import SortIcon from "@mui/icons-material/Sort";

const WellSequencesContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
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
      <WellSequences wells={wells} selectedWellId={selectedWellId} />
    </WellSequencesContainer>
  );
}
