import WellSequences from "./WellSequences";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";

const WellSequencesContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const WellSequencesBar = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
}));

export default function WellSequencesCard({ wells, selectedWellId }) {
  return (
    <WellSequencesContainer>
      <WellSequencesBar>Header</WellSequencesBar>
      <WellSequences wells={wells} selectedWellId={selectedWellId} />
    </WellSequencesContainer>
  );
}
