import Button from "@mui/material/Button";

export default function TriggerMachineButton({ machineId, machineStatus }) {
  return (
    <Button variant="contained">{`${machineStatus} (${machineId})`}</Button>
  );
}
