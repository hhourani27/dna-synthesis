import Chip from "@mui/material/Chip";

export default function MachineStatus({ status }) {
  const statusDisplay = {
    IDLE: {
      label: "Idle",
      color: "#bdbdbd",
    },
    IDLE_ASSIGNED_ORDER: {
      label: "Order assigned ",
      color: "#7e57c2",
    },
    SYNTHETIZING: {
      label: "Synthetizing",
      color: "#42a5f5",
    },
    WAITING_FOR_DISPATCH: {
      label: "Waiting for dispatch",
      color: "#66bb6a",
    },
  };

  return (
    <Chip
      label={statusDisplay[status].label}
      //   color={statusDisplay[status].color}
      variant="outlined"
      sx={{ borderColor: statusDisplay[status].color }}
    />
  );
}
