import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Card from "../layout/Card";

import WellArray from "./well/WellArray";
import MachineCard from "./MachineCard";
import MachineProgress from "./MachineProgress";
import WellSequencesCard from "./well/WellSequencesCard";

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
            /* To make sure that it's height will not be greater than the Well Array's height
               see https://stackoverflow.com/a/48943583/471461  
               For my understanding, it makes sure that this Card's height is not dependent on its content
               Thus its height is automatically to the adjacent flex item (as align-itmes: stretch by default)
            */
            contain: "size", //
          }}
          isLoading={isLoading}
        >
          {machine && machine.status !== "IDLE" && (
            <WellSequencesCard
              wells={machine.wells}
              selectedWellId={selectedWellId}
            />
          )}
        </Card>
      </FlexRow>
    </PageContainer>
  );
}
