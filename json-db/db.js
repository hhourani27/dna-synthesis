var Chance = require("chance");
var chance = new Chance(27);

const locations = ["Paris", "Nice"];

const hello = () => "hello";

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
  // Count total number of machines
  const machineCount =
    IDLE + IDLE_ASSIGNED_ORDER + SYNTHETIZING + WAITING_FOR_DISPATCH;

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

  // Generate the final database
  const data = {
    machines,
    models: [
      {
        id: "DNA-SYNTH-96",
        wells: [12, 8],
      },
    ],
  };

  return data;
};

/**
 * Generate the whole databae
 */
const generateDb = () =>
  generateData({
    IDLE: 1,
    IDLE_ASSIGNED_ORDER: 1,
    SYNTHETIZING: 2,
    WAITING_FOR_DISPATCH: 1,
  });

module.exports = { generateDb: generateDb, hello: hello };
