import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";

export default function MachineStatus({ machine }) {
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
    <Badge
      color="primary"
      {...(machine.status === "SYNTHETIZING"
        ? {
            badgeContent: `${Math.round(
              (100 * machine.synthesis.completedCycles) /
                machine.synthesis.totalCycles
            ).toString()}%`,
          }
        : {})}
    >
      <Chip
        label={statusDisplay[machine.status].label}
        color={statusDisplay[machine.status].color}
      />
    </Badge>
  );
}
