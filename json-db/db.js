var Chance = require("chance");
var chance = new Chance(27);

const locations = ["Paris", "Nice"];

/**
 * Generate Oligonucleotide of given length
 * @param {int} minSize
 * @param {int} maxSize
 * @returns an oligo of length between minSize and maxSize, or of length minSize if maxSize is not provided
 */
const generateOligo = (minSize, maxSize) => {
  const oligoSize =
    maxSize === undefined
      ? minSize
      : chance.integer({ min: minSize, max: maxSize });

  return [...Array(oligoSize)]
    .map(() => chance.pickone(["A", "T", "C", "G"]))
    .join("");
};

/**
 *
 * @param {[string]} oligos
 * @returns the max number of cycles to synthethize these oligos, i.e. the largest oligo in the array
 */
const requiredCycleCount = (oligos) => Math.max(...oligos.map((o) => o.length));

/**
 * Generate the whole database containing machines & orders given the machine count per status as a paramater
 * @param {int} IDLE : Number of machines having the state IDLE
 * @param {int} IDLE_ASSIGNED_ORDER : Number of machines having the state IDLE_ASSIGNED_ORDER
 * @param {int} SYNTHETIZING : Number of machines having the state SYNTHETIZING
 * @param {int} WAITING_FOR_DISPATCH : Number of machines having the state WAITING_FOR_DISPATCH
 */
const generateData = ({
  IDLE,
  IDLE_ASSIGNED_ORDER,
  SYNTHETIZING,
  WAITING_FOR_DISPATCH,
}) => {
  /* (1)  Generate machines */

  // An array of size machineCount, containing the machine statuses
  const machineStatuses = chance.shuffle([
    ...Array(IDLE).fill("IDLE"),
    ...Array(IDLE_ASSIGNED_ORDER).fill("IDLE_ASSIGNED_ORDER"),
    ...Array(SYNTHETIZING).fill("SYNTHETIZING"),
    ...Array(WAITING_FOR_DISPATCH).fill("WAITING_FOR_DISPATCH"),
  ]);

  const machines = machineStatuses.map((status, i) => ({
    id: i + 1,
    model: "DNA-SYNTH-96",
    location: chance.pickone(locations),
    status,
  }));

  /* (2)  Generate orders for non-Idle machines */
  const nonIdleMachineCount =
    IDLE_ASSIGNED_ORDER + SYNTHETIZING + WAITING_FOR_DISPATCH;

  const orders = [...Array(nonIdleMachineCount)].map((o, i) => ({
    id: i + 1,
    oligos: [...Array(96)].map(() => generateOligo(15, 120)),
  }));

  /* (3) Assign orders to non-Idle machines */
  let orderId = 1;
  for (let machine of machines) {
    if (machine.status !== "IDLE") {
      machine.order = orderId;
      orderId++;
    }
  }

  /* (4) Generate Synthesis statuses for non-idle machines */
  for (let machine of machines) {
    if (machine.status !== "IDLE") {
      const orderedOligos = orders.find((o) => o.id === machine.order).oligos;
      const totalCycles = requiredCycleCount(orderedOligos);

      machine.synthesis = {
        totalCycles: totalCycles,
        completedCycles:
          machine.status === "IDLE_ASSIGNED_ORDER"
            ? 0
            : machine.status === "WAITING_FOR_DISPATCH"
            ? totalCycles
            : chance.integer({
                min: 0,
                max: totalCycles,
              }),
        currentStep:
          machine.status === "SYNTHETIZING"
            ? chance.pickone(["ELONGATION", "DEPROTECTION", "WASH"])
            : null,
      };
    }
  }

  // Generate the final database
  const data = {
    machines,
    models: [
      {
        id: "DNA-SYNTH-96",
        wells: [12, 8],
      },
    ],
    orders,
  };

  return data;
};

/**
 * Generate the whole databae
 */
const generateDb = () =>
  generateData({
    IDLE: 2,
    IDLE_ASSIGNED_ORDER: 2,
    SYNTHETIZING: 10,
    WAITING_FOR_DISPATCH: 2,
  });

module.exports = {
  generateDb,
  generateData,
  generateOligo,
  requiredCycleCount,
};
