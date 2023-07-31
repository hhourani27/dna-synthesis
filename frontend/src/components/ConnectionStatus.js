import { ReadyState } from "react-use-websocket";
import StreamIcon from "@mui/icons-material/Stream";
import Tooltip from "@mui/material/Tooltip";

const webSocketConnectionStates = {
  [ReadyState.CONNECTING]: { label: "Connecting to server", color: "success" },
  [ReadyState.OPEN]: { label: "Streaming from server", color: "success" },
  [ReadyState.CLOSING]: {
    label: "Closing connection to server",
    color: "action",
  },
  [ReadyState.CLOSED]: { label: "No connection to server", color: "action" },
  [ReadyState.UNINSTANTIATED]: {
    label: "Uninstantiated connection to server",
    color: "disabled",
  },
};

export default function ConnectionStatus({ webSocketConnectionStatus }) {
  return (
    <Tooltip
      title={webSocketConnectionStates[webSocketConnectionStatus].label}
      placement="bottom"
      arrow
    >
      <StreamIcon
        fontSize="small"
        color={webSocketConnectionStates[webSocketConnectionStatus].color}
      />
    </Tooltip>
  );
}
