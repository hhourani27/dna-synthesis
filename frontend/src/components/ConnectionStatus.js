import { ReadyState } from "react-use-websocket";
import StreamIcon from "@mui/icons-material/Stream";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";

export default function ConnectionStatus({ webSocketConnectionStatus }) {
  const theme = useTheme();

  const webSocketConnectionStates = {
    [ReadyState.CONNECTING]: {
      label: "Connecting to server...",
      color: theme.palette.primary.main,
      spin: true,
    },
    [ReadyState.OPEN]: {
      label: "Streaming from server",
      color: theme.palette.success.dark,
      spin: false,
    },
    [ReadyState.CLOSING]: {
      label: "Closing connection to server...",
      color: theme.palette.warning.main,
      spin: true,
    },
    [ReadyState.CLOSED]: {
      label: "No connection to server",
      color: theme.palette.error.main,
      spin: false,
    },
    [ReadyState.UNINSTANTIATED]: {
      label: "Uninstantiated connection to server",
      color: theme.palette.action.disabled,
      spin: false,
    },
  };

  const statusDisplay = webSocketConnectionStates[webSocketConnectionStatus];
  return (
    <Tooltip title={statusDisplay.label} placement="bottom" arrow>
      <StreamIcon
        fontSize="small"
        sx={{
          color: (theme) => statusDisplay.color,
          "@keyframes spin": {
            "0%": {
              transform: "rotate(0deg)",
            },
            "100%": {
              transform: "rotate(360deg)",
            },
          },
          ...(statusDisplay.spin && { animation: "spin 2s linear infinite" }),
        }}
      />
    </Tooltip>
  );
}
