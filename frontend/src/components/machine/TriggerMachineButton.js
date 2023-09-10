import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

export default function TriggerMachineButton({
  machineId,
  machineStatus,
  updateMachine,
}) {
  const [sendingRequest, setSendingRequest] = useState(false);

  const sendAction = async (machineId, actionMethod) => {
    try {
      setSendingRequest(true);

      let response = await fetch(
        `http://localhost:3001/machines/${machineId}/actions/${actionMethod}`,
        { method: "POST" }
      );

      if (!response.ok) {
        console.error(
          `Server didn't accept the ${actionMethod} action: ${response.status} ${response.statusText} `
        );
      } else {
        const updatedMachine = await response.json();
        updateMachine(updatedMachine);
      }
    } catch (error) {
      console.error(`Error in sending ${actionMethod} action:`, error);
    } finally {
      // Setting sendingRequest to false once the request is over
      setSendingRequest(false);
    }
  };

  const actionsByStatus = {
    IDLE_ASSIGNED_ORDER: {
      onButtonClick: () => sendAction(machineId, "synthetize"),
      buttonLabel: "Start synthetizing",
      disabled: false,
    },
    WAITING_FOR_DISPATCH: {
      onButtonClick: () => sendAction(machineId, "dispatch"),
      buttonLabel: "Dispatch order",
      disabled: false,
    },
    IDLE: {
      onButtonClick: () => {},
      buttonLabel: "No actions available",
      disabled: true,
    },
    SYNTHETIZING: {
      onButtonClick: () => {},
      buttonLabel: "No actions available",
      disabled: true,
    },
  };

  return (
    <LoadingButton
      variant="contained"
      color="success"
      loading={sendingRequest}
      loadingPosition="start"
      startIcon={<SendOutlinedIcon />}
      onClick={actionsByStatus[machineStatus].onButtonClick}
      disabled={actionsByStatus[machineStatus].disabled}
    >
      {actionsByStatus[machineStatus].buttonLabel}
    </LoadingButton>
  );
}
