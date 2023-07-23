import fetch from "node-fetch";
import cron from "node-cron";

const SERVER_URL = "http://localhost:3001/";
const STEP_DURATION = 1; //Duration of a synthetizing step in seconds

async function updateMachines() {
  try {
    console.log("Fetching synthetizing machines");
    const response = await fetch(SERVER_URL + "machines?status=SYNTHETIZING");
    const data = await response.json();
    console.log(`There are ${data.length} synthetizing machines to update`);
    updateSynthetizingMachines(data);
  } catch (error) {
    console.error(error);
  }
}

function updateSynthetizingMachines(machines) {
  machines.forEach((m) => {
    updateSynthetizingMachine(m);
  });
}

function updateSynthetizingMachine(m) {
  if (m.synthesis.currentStep === "ELONGATION") {
    m.synthesis.currentStep = "DEPROTECTION";
    console.log(`Machine ${m.id} : ELONGATION → DEPROTECTION`);
  } else if (m.synthesis.currentStep === "DEPROTECTION") {
    m.synthesis.currentStep = "WASH";
    console.log(`Machine ${m.id} : DEPROTECTION → WASH`);
  } else if (m.synthesis.currentStep === "WASH") {
    m.synthesis.completedCycles += 1;
    m.synthesis.currentStep = "ELONGATION";
    console.log(
      `Machine ${m.id} : Completed ${m.synthesis.completedCycles} cycles: WASH → ELONGATION`
    );

    m.wells.forEach((w) => {
      if (w.status === "SYNTHETIZING_OLIGO") {
        w.synthetizedNucleotideCount += 1;
        if (w.synthetizedNucleotideCount === w.totalCycles) {
          w.status === "COMPLETED_OLIGO";
        }
      }
    });
  }

  if (m.synthesis.completedCycles === m.synthesis.totalCycles) {
    m.status = "WAITING_FOR_DISPATCH";
    m.synthesis.currentStep = null;
    console.log(`Machine ${m.id} : Completed Synthesis`);
  }
}

cron.schedule(`*/${STEP_DURATION} * * * * *`, async () => {
  console.log("Start update cycle");
  const result = await updateMachines();
  // if (result) {
  //   postRequest(result);
  // }
});