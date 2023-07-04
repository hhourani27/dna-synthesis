import Box from "@mui/material/Box";
import Well from "./Well";

export default function MachineProgress({
  status,
  completedCycles,
  totalCycles,
  currentStep,
}) {
  const size = 200;

  return status === "IDLE" ? (
    <Well idle size={size} />
  ) : (
    <Well
      size={size}
      status={status}
      completedCycles={completedCycles}
      totalCycles={totalCycles}
      currentStep={currentStep}
    />
  );
}
