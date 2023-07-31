import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import MachineImage from "./models/DNA-SYNTH-96.svg";
import MachineStatus from "./MachineStatusChip";

export default function MachineCard({ machine }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap={3}
      sx={{
        p: 2,
      }}
    >
      <img src={MachineImage} alt="image" width="200" />
      <Box>
        <Typography variant="h4" component="div">
          {machine.model}
        </Typography>
        <Box display="flex" flexDirection="row" gap={2}>
          <Typography
            component="div"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            <Box display="flex" flexDirection="row" alignItems="center">
              <LocationOnIcon color="text.secondary" />
              {machine.location}
            </Box>
          </Typography>
          <Typography component="div" color="text.secondary">
            ID: {machine.id}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
          <MachineStatus machine={machine} />
          {machine.status !== "IDLE" && (
            <Typography component="div" color="text.secondary">
              Order {machine.order}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
