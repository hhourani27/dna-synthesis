import fetch from "node-fetch";
import cron from "node-cron";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.printf(
    ({ level, message, label, timestamp }) => `${label}: ${message}`
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "simulator.log" }),
  ],
});

const SERVER_URL = "http://localhost:3001/";
const STEP_DURATION = 10; //Duration of a synthetizing step in seconds

async function updateMachines() {
  try {
    logger.info("Fetching synthetizing machines", { label: "Query" });
    const response = await fetch(SERVER_URL + "machines?status=SYNTHETIZING");
    const machines = await response.json();
    logger.info(
      `There are ${machines.length} synthetizing machines to update`,
      { label: "Query" }
    );
    updateSynthetizingMachines(machines);
    sendPatchRequests(machines);
    return machines;
  } catch (error) {
    logger.error(error, { label: "Query" });
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
    logger.info(`Machine ${m.id} : ELONGATION → DEPROTECTION`, {
      label: "Update",
    });
  } else if (m.synthesis.currentStep === "DEPROTECTION") {
    m.synthesis.currentStep = "WASH";
    logger.info(`Machine ${m.id} : DEPROTECTION → WASH`, {
      label: "Update",
    });
  } else if (m.synthesis.currentStep === "WASH") {
    m.synthesis.completedCycles += 1;
    m.synthesis.currentStep = "ELONGATION";
    logger.info(
      `Machine ${m.id} : Completed ${m.synthesis.completedCycles} cycles: WASH → ELONGATION`,
      {
        label: "Update",
      }
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
    logger.info(`Machine ${m.id} : Completed Synthesis`, {
      label: "Update",
    });
  }
}

async function sendPatchRequests(machines) {
  for (const m of machines) {
    try {
      logger.info(`Sending PATCH request for machine ${m.id}`, {
        label: "Patch",
      });
      const response = await fetch(SERVER_URL + `machines/${m.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(m),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      logger.info(`Successfully patched machine ${m.id}`, {
        label: "Patch",
      });
    } catch (error) {
      logger.error(`Failed to patch machine ${m.id}: ${error}`, {
        label: "Patch",
      });
    }
  }
}

cron.schedule(`*/${STEP_DURATION} * * * * *`, async () => {
  logger.info("Start update cycle", {
    label: "Cycle",
  });
  const machines = await updateMachines();
});
