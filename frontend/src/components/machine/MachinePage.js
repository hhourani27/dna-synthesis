import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PaperMUI from "@mui/material/Paper";

import WellArray from "./WellArray";
import MachineCard from "./MachineCard";
import MachineProgress from "./MachineProgress";
import { CircularProgress } from "@mui/material";

const Paper = styled(PaperMUI)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  padding: theme.spacing(1),
  //   textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function MachinePage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [machine, setMachine] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function getData() {
      const machineResp = await fetch(`http://localhost:3001/machines/${id}`);
      const machine = await machineResp.json();
      const modelResp = await fetch(
        `http://localhost:3001/models/${machine.model}`
      );
      const model = await modelResp.json();

      setMachine(machine);
      setModel(model);
      setIsLoading(false);
    }

    getData();
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" flexDirection="row" gap={2}>
        <Paper elevation={1} sx={{ flexGrow: "1" }}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : (
            <MachineCard machine={machine} />
          )}
        </Paper>
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : machine.status === "IDLE" ? (
            <MachineProgress status={machine.status} />
          ) : (
            <MachineProgress
              status={machine.status}
              completedCycles={machine.synthesis.completedCycles}
              totalCycles={machine.synthesis.totalCycles}
              currentStep={machine.synthesis.currentStep}
            />
          )}
        </Paper>
      </Box>
      <Paper elevation={1}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : (
          <WellArray
            wellArrayRowSize={model.wellArraySize[0]}
            wellArrayColSize={model.wellArraySize[1]}
            wells={machine.wells}
          />
        )}
      </Paper>
    </Box>
  );
}
