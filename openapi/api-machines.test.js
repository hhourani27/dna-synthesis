/**
 * Added those 2 lines, as fetching was failing with TypeError: fetch failed  connect ECONNREFUSED ::1:3001
 * Although, Node does not fully support fetch, it does when there's "type": "module" in package.json
 * But even after adding "type": "module", it still fails.
 *
 * This seems to be a dns issue with using fetch. I added those 2 lines to solve it following https://stackoverflow.com/a/72416352/471461
 */
const dns = require("node:dns");
dns.setDefaultResultOrder("ipv4first");

const SERVER_URL = "http://localhost:3001/";

describe("GET /machines", () => {
  let machines;
  let idleMachines;
  let nonIdleMachines;
  let synthetizingMachines;

  beforeAll(async () => {
    const response = await fetch(SERVER_URL + "machines");
    machines = await response.json();
    idleMachines = machines.filter((m) => m.status === "IDLE");
    nonIdleMachines = machines.filter((m) => m.status !== "IDLE");
    synthetizingMachines = machines.filter((m) => m.status === "SYNTHETIZING");
  });

  test("First test to make sure that dataset has machines of all statuses", () => {
    expect(machines.filter((m) => m.status === "IDLE").length).toBeGreaterThan(
      0
    );
    expect(
      machines.filter((m) => m.status === "IDLE_ASSIGNED_ORDER").length
    ).toBeGreaterThan(0);
    expect(
      machines.filter((m) => m.status === "SYNTHETIZING").length
    ).toBeGreaterThan(0);
    expect(
      machines.filter((m) => m.status === "WAITING_FOR_DISPATCH").length
    ).toBeGreaterThan(0);
  });

  test("Id, model, location, status are always present", () => {
    machines.forEach((m) => {
      expect(m).toMatchObject({
        id: expect.any(Number),
        model: expect.any(String),
        location: expect.any(String),
        status: expect.any(String),
      });
    });
  });

  test("Wells is always present with properties id, row, col, status", () => {
    machines.forEach((m) => {
      expect(m).toHaveProperty("wells");
      expect(m.wells).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            row: expect.any(Number),
            col: expect.any(Number),
            status: expect.any(String),
          }),
        ])
      );
    });
  });

  test("Machine status take one of 4 values", () => {
    machines.forEach((m) => {
      expect([
        "IDLE",
        "IDLE_ASSIGNED_ORDER",
        "SYNTHETIZING",
        "WAITING_FOR_DISPATCH",
      ]).toContain(m.status);
    });
  });

  test("Wells status take one of 4 values", () => {
    machines.forEach((m) => {
      m.wells.forEach((w) => {
        expect([
          "IDLE",
          "IDLE_ASSIGNED_OLIGO",
          "SYNTHETIZING_OLIGO",
          "COMPLETED_OLIGO",
        ]).toContain(w.status);
      });
    });
  });

  test("Machine have the correct number of wells as specified by their model", async () => {
    const responseModels = await fetch(SERVER_URL + "models");
    const models = await responseModels.json();

    machines.forEach((m) => {
      model = models.find((md) => md.id === m.model);
      expect(m.wells.length).toBe(
        model.wellArraySize[0] * model.wellArraySize[1]
      );
    });
  });

  test("Idle machines do not have order or synthesis information", () => {
    idleMachines.forEach((m) => {
      expect(m.order).toBeUndefined();
      expect(m.synthesis).toBeUndefined();
    });
  });

  test("Idle machines have idle wells", () => {
    idleMachines.forEach((m) => {
      m.wells.forEach((w) => {
        expect(w.status).toBe("IDLE");
        expect(w.oligo).toBeUndefined();
        expect(w.totalCycles).toBeUndefined();
        expect(w.synthetizedNucleotideCount).toBeUndefined();
      });
    });
  });

  test("Non-idle machines have order, synthesis and oligo information", () => {
    nonIdleMachines.forEach((m) => {
      expect(m).toHaveProperty("order", expect.any(Number));
      expect(m).toHaveProperty("synthesis");
      expect(m.synthesis).toHaveProperty("totalCycles", expect.any(Number));
      expect(m.synthesis.totalCycles).toBeGreaterThanOrEqual(0);
      expect(m.synthesis).toHaveProperty("completedCycles", expect.any(Number));
      expect(m.synthesis.completedCycles).toBeGreaterThanOrEqual(0);

      m.wells.forEach((w) => {
        expect(w).toHaveProperty("oligo", expect.any(String));
        expect(w).toHaveProperty("totalCycles", expect.any(Number));
        expect(w.totalCycles).toBeGreaterThanOrEqual(0);
        expect(w).toHaveProperty(
          "synthetizedNucleotideCount",
          expect.any(Number)
        );
        expect(w.synthetizedNucleotideCount).toBeGreaterThanOrEqual(0);
      });
    });
  });

  test("Oligo is always ATCG", () => {
    nonIdleMachines.forEach((m) => {
      m.wells.forEach((w) => {
        expect(w.oligo).toMatch(/^[ATCG]+$/);
      });
    });
  });

  test("Machines with assigned order but didn't start synthetizing yet, or finished synthetizing, has no currentStep", () => {
    const nonSynthetizingMachines = machines.filter((m) =>
      ["IDLE_ASSIGNED_ORDER", "WAITING_FOR_DISPATCH "].includes(m.status)
    );
    nonSynthetizingMachines.forEach((m) => {
      const syn = m.synthesis;
      if (syn.hasOwnProperty("currentStep")) {
        expect(syn.currentStep).toBeNull();
      } else {
        expect(syn.currentStep).toBeUndefined();
      }
    });
  });

  test("completedCycles or synthetizedNucleotideCount <= totalCycles", () => {
    nonIdleMachines.forEach((m) => {
      expect(m.synthesis.completedCycles).toBeLessThanOrEqual(
        m.synthesis.totalCycles
      );

      m.wells.forEach((w) => {
        expect(w.synthetizedNucleotideCount).toBeLessThanOrEqual(w.totalCycles);
      });
    });
  });

  test("Well's totalCycles <= machine's totalCycles", () => {
    nonIdleMachines.forEach((m) => {
      m.wells.forEach((w) => {
        expect(w.totalCycles).toBeLessThanOrEqual(m.synthesis.totalCycles);
      });
    });
  });

  test("Machine's totalCycles == longest oligo", () => {
    nonIdleMachines.forEach((m) => {
      expect(m.synthesis.totalCycles).toBe(
        Math.max(...m.wells.map((w) => w.oligo.length))
      );
    });
  });

  test("Machines that didn't start synthetizing have completedCycles = 0", () => {
    const idleAssignedOrderMachines = machines.filter(
      (m) => m.status === "IDLE_ASSIGNED_ORDER"
    );
    idleAssignedOrderMachines.forEach((m) => {
      expect(m.synthesis.completedCycles).toBe(0);

      m.wells.forEach((w) => {
        expect(w.synthetizedNucleotideCount).toBe(0);
      });
    });
  });

  test("Synthetizing machines have the currentStep information", () => {
    synthetizingMachines.forEach((m) => {
      expect(["ELONGATION", "DEPROTECTION", "WASH"]).toContain(
        m.synthesis.currentStep
      );
    });
  });

  test("Synthetizing machines have the correct well status", () => {
    synthetizingMachines.forEach((m) => {
      m.wells.forEach((w) => {
        if (m.synthesis.completedCycles >= w.totalCycles) {
          expect(w.status).toBe("COMPLETED_OLIGO");
        } else {
          expect(w.status).toBe("SYNTHETIZING_OLIGO");
        }
      });
    });
  });

  test("Machines that completed orders have synthetized all nucleotides", () => {
    const completedMachines = machines.filter(
      (m) => m.status === "WAITING_FOR_DISPATCH"
    );
    completedMachines.forEach((m) => {
      m.wells.forEach((w) => {
        expect(w.synthetizedNucleotideCount).toBe(w.totalCycles);
      });
    });
  });
});

describe("GET /machines?status={status}", () => {
  test("Query IDLE machines", async () => {
    const response = await fetch(SERVER_URL + "machines?status=IDLE");
    const machines = await response.json();
    machines.forEach((m) => {
      expect(m.status).toBe("IDLE");
    });
  });

  test("Query IDLE_ASSIGNED_ORDER machines", async () => {
    const response = await fetch(
      SERVER_URL + "machines?status=IDLE_ASSIGNED_ORDER"
    );
    const machines = await response.json();
    machines.forEach((m) => {
      expect(m.status).toBe("IDLE_ASSIGNED_ORDER");
    });
  });

  test("Query SYNTHETIZING machines", async () => {
    const response = await fetch(SERVER_URL + "machines?status=SYNTHETIZING");
    const machines = await response.json();
    machines.forEach((m) => {
      expect(m.status).toBe("SYNTHETIZING");
    });
  });

  test("Query WAITING_FOR_DISPATCH machines", async () => {
    const response = await fetch(
      SERVER_URL + "machines?status=WAITING_FOR_DISPATCH"
    );
    const machines = await response.json();
    machines.forEach((m) => {
      expect(m.status).toBe("WAITING_FOR_DISPATCH");
    });
  });

  test("Invalid status query parameter value", async () => {
    const response = await fetch(SERVER_URL + "machines?status=INVALID_STATUS");
    expect(response.status).toBe(400);
    const error = await response.json();
    expect(error).toHaveProperty("error", expect.any(String));
  });

  test("Ignore invalid query parameters", async () => {
    const responseAll = await fetch(SERVER_URL + "machines");
    const machines = await responseAll.json();

    const responseQuery = await fetch(SERVER_URL + "machines?invalid=IDLE");
    const machinesQuery = await responseQuery.json();
    expect(machinesQuery.length).toBe(machines.length);
  });
});

describe("GET /machines/{machineId}", () => {
  let machines;

  beforeAll(async () => {
    const response = await fetch(SERVER_URL + "machines");
    machines = await response.json();
  });

  test("Query a single machine", async () => {
    const machineId = machines[0].id;

    const responseMachine0 = await fetch(SERVER_URL + `machines/${machineId}`);
    const machine0 = await responseMachine0.json();

    expect(machine0.id).toBe(machineId);
    expect(machine0.status).toBe(machines[0].status);
  });

  test("Query a non-existing machine", async () => {
    const machineIds = machines.map((m) => m.id);
    // Find a non-existing machine ID
    let machineId = 1;
    while (machineIds.includes(machineId)) {
      machineId++;
    }

    const responseNonExistingMachine = await fetch(
      SERVER_URL + `machines/${machineId}`
    );
    expect(responseNonExistingMachine.status).toBe(404);
    const error = await responseNonExistingMachine.json();
    expect(error).toHaveProperty("error", expect.any(String));
  });
});

describe.only("PATCH /machines/{machineId}", () => {
  test("Start the machine's synthesis operation", async () => {
    // 1. Check that there are machines waiting to start synthesis
    let response = await fetch(
      SERVER_URL + `machines/?status=IDLE_ASSIGNED_ORDER`
    );
    const idle_assigned_orders_machines = await response.json();
    expect(idle_assigned_orders_machines.length).toBeGreaterThan(0);

    // 2. Pick a machine to start synthetizing
    const machine = idle_assigned_orders_machines[0];
    const machineId = machine.id;

    // 3. Create the payload
    const payload = {
      status: "SYNTHETIZING",
      synthesis: {
        completedCycles: 0,
        currentStep: "ELONGATION",
      },
      wells: machine.wells.map((w) => ({
        id: w.id,
        status: "SYNTHETIZING_OLIGO",
        synthetizedNucleotideCount: 0,
      })),
    };

    // 4. Send the PATCH request
    response = await fetch(SERVER_URL + `machines/${machineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // 5. Test that the response is correct
    expect(response.status).toBe(200);
    let modifiedMachine = await response.json();
    expect(modifiedMachine.id).toBe(machineId);
    expect(modifiedMachine.status).toBe("SYNTHETIZING");
    expect(modifiedMachine.wells[0].status).toBe("SYNTHETIZING_OLIGO");

    // 6. Re-request the same machine and verify that the state is correct
    response = await fetch(SERVER_URL + `machines/${machineId}`);
    modifiedMachine = await response.json();
    expect(modifiedMachine.id).toBe(machineId);
    expect(modifiedMachine.status).toBe("SYNTHETIZING");
    expect(modifiedMachine.wells[0].status).toBe("SYNTHETIZING_OLIGO");
  });

  test("Complete the machine's synthesis operation", async () => {
    // 1. Check that there are machines waiting to start synthesis
    let response = await fetch(SERVER_URL + `machines/?status=SYNTHETIZING`);
    const synthetizing_machines = await response.json();
    expect(synthetizing_machines.length).toBeGreaterThan(0);

    // 2. Pick a machine to complete synthetizing
    const machine = synthetizing_machines[0];
    const machineId = machine.id;

    // 3. Create the payload
    const payload = {
      status: "WAITING_FOR_DISPATCH",
      synthesis: {
        completedCycles: machine.synthesis.totalCycles,
        currentStep: null,
      },
      wells: machine.wells.map((w) => ({
        id: w.id,
        status: "COMPLETED_OLIGO",
        synthetizedNucleotideCount: w.totalCycles,
      })),
    };

    // 4. Send the PATCH request
    response = await fetch(SERVER_URL + `machines/${machineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // 5. Test that the response is correct
    expect(response.status).toBe(200);
    let modifiedMachine = await response.json();
    expect(modifiedMachine.id).toBe(machineId);
    expect(modifiedMachine.status).toBe("WAITING_FOR_DISPATCH");
    expect(modifiedMachine.synthesis.completedCycles).toBe(
      modifiedMachine.synthesis.totalCycles
    );
    expect(modifiedMachine.synthesis.currentStep).toBe(null);
    expect(modifiedMachine.wells[0].status).toBe("COMPLETED_OLIGO");

    // 6. Re-request the same machine and verify that the state is correct
    response = await fetch(SERVER_URL + `machines/${machineId}`);
    modifiedMachine = await response.json();
    expect(modifiedMachine.id).toBe(machineId);
    expect(modifiedMachine.status).toBe("WAITING_FOR_DISPATCH");
    expect(modifiedMachine.synthesis.completedCycles).toBe(
      modifiedMachine.synthesis.totalCycles
    );
    expect(modifiedMachine.synthesis.currentStep).toBe(null);
    expect(modifiedMachine.wells[0].status).toBe("COMPLETED_OLIGO");
  });

  test("Patch a non-existing machine", async () => {
    // 1. Query all machines
    let response = await fetch(SERVER_URL + `machines`);
    const machines = await response.json();
    const machineIds = machines.map((m) => m.id);

    // 2. Find a non-existing machine ID
    let machineId = 1;
    while (machineIds.includes(machineId)) {
      machineId++;
    }

    // 3. Create the payload
    const payload = {
      status: "SYNTHETIZING",
    };

    // 4. Send the PATCH request
    response = await fetch(SERVER_URL + `machines/${machineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    expect(response.status).toBe(404);
    const error = await response.json();
    expect(error).toHaveProperty("error", expect.any(String));
  });
});
