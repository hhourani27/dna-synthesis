import Box from "@mui/material/Box";
import Well from "./Well";

import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import ShowerIcon from "@mui/icons-material/Shower";

export default function MachineProgress({
  status,
  completedCycles,
  totalCycles,
  currentStep,
}) {
  const size = 175;
  const thickness = 6;

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RemoveModeratorIcon
          color={currentStep === "DEPROTECTION" ? "primary" : "gray"}
        />
      </Box>
      <Box display="flex" flexDirection="row" gap={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SwitchAccessShortcutAddIcon
            color={currentStep === "ELONGATION" ? "primary" : "gray"}
          />
        </Box>
        <Box>
          {status === "IDLE" ? (
            <Well idle size={size} thickness={thickness} />
          ) : (
            <Well
              size={size}
              thickness={thickness}
              status={status}
              completedCycles={completedCycles}
              totalCycles={totalCycles}
              currentStep={currentStep}
              displayCount
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ShowerIcon color={currentStep === "WASH" ? "primary" : "gray"} />
        </Box>
      </Box>
    </Box>
  );
}
