import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PaperMUI from "@mui/material/Paper";

import WellArray from "./WellArray";
import MachineCard from "./MachineCard";
import MachineProgress from "./MachineProgress";
import SequenceTable from "./SequenceTable";
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
  const [selectedWellId, setSelectedWellId] = useState(null);

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
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "row", gap: 2, width: "100%" }}
      >
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
          ) : selectedWellId !== null ? (
            (() => {
              const selectedWell = machine.wells.find(
                (w) => w.id === selectedWellId
              );

              return (
                <MachineProgress
                  status={selectedWell.status}
                  {
                    // Nice technique to conditionally include props: https://stackoverflow.com/a/51404352/471461
                    ...(machine.status !== "IDLE"
                      ? {
                          completedCycles:
                            selectedWell.synthetizedNucleotideCount,
                          totalCycles: selectedWell.totalCycles,
                          currentStep: machine.synthesis.currentStep,
                        }
                      : {})
                  }
                />
              );
            })()
          ) : (
            <MachineProgress
              status={machine.status}
              {
                // Nice technique to conditionally include props: https://stackoverflow.com/a/51404352/471461
                ...(machine.status !== "IDLE"
                  ? {
                      completedCycles: machine.synthesis.completedCycles,
                      totalCycles: machine.synthesis.totalCycles,
                      currentStep: machine.synthesis.currentStep,
                    }
                  : {})
              }
            />
          )}
        </Paper>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <Paper elevation={1}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : (
            <WellArray
              wellArraySize={model.wellArraySize}
              wells={machine.wells}
              selectedWellId={selectedWellId}
              onWellSelection={(id) => {
                setSelectedWellId(id);
              }}
              onWellDeselection={() => setSelectedWellId(null)}
            />
          )}
        </Paper>
        <Paper elevation={1} sx={{ overflow: "auto", contain: "size" }}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : (
            <SequenceTable
              wellArraySize={model.wellArraySize}
              wells={machine.wells}
            />
          )}
        </Paper>
      </Box>
    </Box>
  );
}
