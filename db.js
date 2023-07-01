module.exports = () => {
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

  return data;
};
