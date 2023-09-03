import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import MachineImage from "./models/DNA-SYNTH-96.svg";
import MachineStatus from "./MachineStatusChip";
import TriggerMachineButton from "./TriggerMachineButton";

export default function MachineCard({ machine, updateMachine }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      gap={3}
      sx={{
        p: 2,
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={3}
        sx={{
          p: 2,
        }}
      >
        <Box margin={1}>
          <img src={MachineImage} alt={machine.model} width="225" />
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
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
            {machine.status !== "IDLE" && (
              <Typography component="div" color="text.secondary">
                Order {machine.order}
              </Typography>
            )}
            <MachineStatus machine={machine} />
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="flex-start">
        {machine.status === "IDLE_ASSIGNED_ORDER" ? (
          <TriggerMachineButton
            machineId={machine.id}
            machineStatus={machine.status}
            updateMachine={updateMachine}
          />
        ) : null}
      </Box>
    </Box>
  );
}
