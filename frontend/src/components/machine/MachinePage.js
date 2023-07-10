import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "../layout/Card";

import WellArray from "./WellArray";
import MachineCard from "./MachineCard";
import MachineProgress from "./MachineProgress";
import SequenceTable from "./SequenceTable";
import { CircularProgress } from "@mui/material";

const PageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  width: "100%",
}));

const FlexRow = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2),
  width: "100%",
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
    <PageContainer>
      <FlexRow>
        <Card sx={{ flexGrow: "1" }} isLoading={isLoading}>
          <MachineCard machine={machine} />
        </Card>
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          isLoading={isLoading}
        >
          {machine &&
            model &&
            (selectedWellId !== null ? (
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
            ))}
        </Card>
      </FlexRow>
      <FlexRow>
        <Card sx={{ flexGrow: "1", flexBasis: "0" }} isLoading={isLoading}>
          {machine && model && (
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
        </Card>
        <Card
          sx={{
            flexGrow: "1",
            flexBasis: "0",
            overflow: "auto",
            contain: "size", // To make sur that it's height will not be greater than the Well Array's height. see https://stackoverflow.com/a/48943583/471461
          }}
          isLoading={isLoading}
        >
          {machine && model && (
            <SequenceTable
              wellArraySize={model.wellArraySize}
              wells={machine.wells}
            />
          )}
        </Card>
      </FlexRow>
    </PageContainer>
  );
}
