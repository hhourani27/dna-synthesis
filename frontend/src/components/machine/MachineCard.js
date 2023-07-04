import Box from "@mui/material/Box";
import MachineImage from "./models/DNA-SYNTH-96.svg";

export default function MachineCard({ machine }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        p: 2,
      }}
    >
      <img src={MachineImage} alt="image" width="200" />
      <Box>
        <Box component="h2">{machine.model}</Box>
        <Box sx={{ color: "text.secondary" }}>Sessions</Box>
        <Box
          sx={{
            color: "success.dark",
            display: "inline",
            fontWeight: "bold",
            mx: 0.5,
            fontSize: 14,
          }}
        >
          +18.77%
        </Box>
        <Box sx={{ color: "text.secondary", display: "inline", fontSize: 14 }}>
          vs. last week
        </Box>
      </Box>
    </Box>
  );
}
