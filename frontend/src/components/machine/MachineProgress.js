import Box from "@mui/material/Box";
import Well from "./well/Well";
import Tooltip from "@mui/material/Tooltip";

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
  const stepColor = {
    current: "primary",
    other: "disabled",
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip title="2. De-protection" placement="top" arrow>
          <RemoveModeratorIcon
            color={
              currentStep === "DEPROTECTION"
                ? stepColor.current
                : stepColor.other
            }
          />
        </Tooltip>
      </Box>
      <Box display="flex" flexDirection="row" gap={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title="1. Elongation" placement="top" arrow>
            <SwitchAccessShortcutAddIcon
              color={
                currentStep === "ELONGATION"
                  ? stepColor.current
                  : stepColor.other
              }
            />
          </Tooltip>
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
          <Tooltip title="3. Wash" placement="top" arrow>
            <ShowerIcon
              color={
                currentStep === "WASH" ? stepColor.current : stepColor.other
              }
            />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
