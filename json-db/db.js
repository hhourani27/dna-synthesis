var Chance = require("chance");
var chance = new Chance();

const locations = ["Paris", "Nice"];

function generateData({
  IDLE,
  IDLE_ASSIGNED_ORDER,
  SYNTHETIZING,
  WAITING_FOR_DISPATCH,
}) {
  const machineCount =
    IDLE + IDLE_ASSIGNED_ORDER + SYNTHETIZING + WAITING_FOR_DISPATCH;

  const machines = [...Array(machineCount).keys()].map((n) => ({
    id: n + 1,
    model: "DNA-SYNTH-96",
    location: chance.string(),
    status: "IDLE",
  }));

  const data = {
    machines: machines,
    models: [
      {
        id: "DNA-SYNTH-96",
        wells: [12, 8],
      },
    ],
  };

  return data;
}

function generateDb() {
  return generateData({
    IDLE: 1,
    IDLE_ASSIGNED_ORDER: 1,
    SYNTHETIZING: 2,
    WAITING_FOR_DISPATCH: 1,
  });
}

const data = {
  machines: [
    {
      id: 1,
      model: "DNA-SYNTH-96",
      location: "Paris",
      status: "IDLE",
    },
    {
      id: 2,
      model: "DNA-SYNTH-96",
      location: "Paris",
      status: "IDLE_ASSIGNED_ORDER",
    },
    {
      id: 3,
      model: "DNA-SYNTH-96",
      location: "Nice",
      status: "SYNTHETIZING",
    },
    {
      id: 4,
      model: "DNA-SYNTH-96",
      location: "Nice",
      status: "SYNTHETIZING",
    },
    {
      id: 5,
      model: "DNA-SYNTH-96",
      location: "Nice",
      status: "WAITING_FOR_DISPATCH",
    },
  ],
  models: [
    {
      id: "DNA-SYNTH-96",
      wells: [12, 8],
    },
  ],
};

module.exports = generateDb;
