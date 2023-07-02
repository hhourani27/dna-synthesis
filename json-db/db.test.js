const db = require("./db");

test("Test that oligos are generated with the current length", () => {
  const oligo30 = db.generateOligo(30);
  expect(oligo30).toHaveLength(30);
  [...oligo30].forEach((n) => expect(["A", "T", "C", "G"]).toContain(n));

  const oligo40 = db.generateOligo(40, 40);
  expect(oligo40).toHaveLength(40);
  [...oligo40].forEach((n) => expect(["A", "T", "C", "G"]).toContain(n));

  const oligo50_100 = db.generateOligo(50, 100);
  expect(oligo50_100.length).toBeGreaterThanOrEqual(50);
  expect(oligo50_100.length).toBeLessThanOrEqual(100);
  [...oligo50_100].forEach((n) => expect(["A", "T", "C", "G"]).toContain(n));
});

test("Test that no orders are generated if there's only Idle machines", () => {
  const data = db.generateData({
    IDLE: 10,
    IDLE_ASSIGNED_ORDER: 0,
    SYNTHETIZING: 0,
    WAITING_FOR_DISPATCH: 0,
  });

  expect(data.orders).toHaveLength(0);
  data.machines.forEach((m) =>
    expect.not.objectContaining({ order: expect.anything() })
  );
});

test("Test that required cycles to fullfill order are calculated correctly", () => {
  const oligos = [
    db.generateOligo(27),
    db.generateOligo(9),
    db.generateOligo(88),
  ];
  expect(db.requiredCycleCount(oligos)).toBe(88);
});

test("Test that current step is correct when the machine is synthetizing", () => {
  const data = db.generateData({
    IDLE: 1,
    IDLE_ASSIGNED_ORDER: 1,
    SYNTHETIZING: 100,
    WAITING_FOR_DISPATCH: 1,
  });

  data.machines
    .filter((m) => m.status === "SYNTHETIZING")
    .forEach((m) =>
      expect(["ELONGATION", "DEPROTECTION", "WASH"]).toContain(
        m.synthesis.currentStep
      )
    );

  data.machines
    .filter((m) => m.status !== "SYNTHETIZING")
    .forEach((m) => expect(m?.synthesis?.currentStep).toBeFalsy());
});

test("Test that for idle machines, the number of wells is correct", () => {
  const data = db.generateData({
    IDLE: 1,
    IDLE_ASSIGNED_ORDER: 0,
    SYNTHETIZING: 0,
    WAITING_FOR_DISPATCH: 0,
  });

  expect(data.machines[0].wells.length).toBe(8);
  data.machines[0].wells.forEach((row) => expect(row.length).toBe(12));
});

test("Test that IDs are correctly assigned to wells", () => {
  const data = db.generateData({
    IDLE: 1,
    IDLE_ASSIGNED_ORDER: 0,
    SYNTHETIZING: 0,
    WAITING_FOR_DISPATCH: 0,
  });

  const wells = data.machines[0].wells;
  let id = 0;
  for (let row of wells) {
    for (let col of row) {
      expect(col.id).toBe(id);
      id++;
    }
  }
});
