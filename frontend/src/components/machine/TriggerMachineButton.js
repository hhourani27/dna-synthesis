import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

export default function TriggerMachineButton({
  machineId,
  machineStatus,
  updateMachine,
}) {
  const [sendingRequest, setSendingRequest] = useState(false);

  const sendActionSynthetize = async (mid) => {
    try {
      setSendingRequest(true);

      let response = await fetch(
        `http://localhost:3001/machines/${mid}/actions/synthetize`,
        { method: "POST" }
      );

      if (!response.ok) {
        console.error(
          `Server didn't accept the Synthetize action: ${response.status} ${response.statusText} `
        );
      } else {
        const updatedMachine = await response.json();
        updateMachine(updatedMachine);
      }
    } catch (error) {
      console.error("Error in sending Synthetize action:", error);
    } finally {
      // Setting sendingRequest to false once the request is over
      setSendingRequest(false);
    }
  };

  return (
    <LoadingButton
      variant="contained"
      color="success"
      loading={sendingRequest}
      loadingPosition="start"
      startIcon={<SendOutlinedIcon />}
      onClick={() => {
        sendActionSynthetize(machineId);
      }}
    >
      {machineStatus === "IDLE_ASSIGNED_ORDER"
        ? "Start synthetizing"
        : "No actions available"}
    </LoadingButton>
  );
}
