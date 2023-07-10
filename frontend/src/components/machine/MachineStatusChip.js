import Chip from "@mui/material/Chip";

export default function MachineStatus({ status }) {
  const statusDisplay = {
    IDLE: {
      label: "Idle",
      color: "default",
    },
    IDLE_ASSIGNED_ORDER: {
      label: "Order assigned ",
      color: "default",
    },
    SYNTHETIZING: {
      label: "Synthetizing",
      color: "secondary",
    },
    WAITING_FOR_DISPATCH: {
      label: "Waiting for dispatch",
      color: "success",
    },
  };

  return (
    <Chip
      label={statusDisplay[status].label}
      color={statusDisplay[status].color}
    />
  );
}
