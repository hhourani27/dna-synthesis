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

describe("GET /orders", () => {
  let orders;
  let newOrders;
  let assignedOrders;
  let completedOrders;

  beforeAll(async () => {
    const response = await fetch(SERVER_URL + "orders");
    orders = await response.json();

    newOrders = orders.filter((o) => o.status === "NEW");
    assignedOrders = orders.filter((o) => o.status === "ASSIGNED_TO_MACHINE");
    completedOrders = orders.filter((o) => o.status === "COMPLETED");
  });

  test("First test to make sure that dataset has orders of all statuses", async () => {
    expect(newOrders.length).toBeGreaterThan(0);
    expect(assignedOrders.length).toBeGreaterThan(0);
    expect(completedOrders.length).toBeGreaterThan(0);
  });

  test("Id, status and oligos are always present", () => {
    orders.forEach((o) => {
      expect(o).toMatchObject({
        id: expect.any(Number),
        status: expect.any(String),
      });
      expect(o).toHaveProperty("oligos");
      expect(o.oligos).toEqual(expect.arrayContaining([expect.any(String)]));
    });
  });

  test("Order status take one of 3 values", () => {
    orders.forEach((o) => {
      expect(["NEW", "ASSIGNED_TO_MACHINE", "COMPLETED"]).toContain(o.status);
    });
  });

  test("New orders are not assigned to machines", () => {
    newOrders.forEach((o) => {
      expect(o.machine_id).toBeUndefined();
    });
  });

  test("Orders that are assigned to machines should be linked to a machine, and that machine linked to that order", async () => {
    const response = await fetch(SERVER_URL + `machines`);
    const machines = await response.json();

    assignedOrders.forEach((o) => {
      expect(o).toHaveProperty("machine_id");
      const assigned_machine = machines.find((m) => m.id === o.machine_id);
      expect(assigned_machine.order).toBe(o.id);
    });
  });

  test("Completed orders should be assigned to a machine, but that machine should not be assigned to that order", async () => {
    const response = await fetch(SERVER_URL + `machines`);
    const machines = await response.json();

    completedOrders.forEach((o_c) => {
      expect(o_c).toHaveProperty("machine_id");
      expect(machines.some((m) => m.order === o_c.id)).toBe(false);
    });
  });
});

describe("GET /orders/{orderId}", () => {
  let orders;

  beforeAll(async () => {
    const response = await fetch(SERVER_URL + "orders");
    orders = await response.json();
  });

  test("Query a single order", async () => {
    const orderId = orders[0].id;

    const responseOrder0 = await fetch(SERVER_URL + `orders/${orderId}`);
    const order0 = await responseOrder0.json();

    expect(order0.id).toBe(orderId);
    expect(order0.status).toBe(orders[0].status);
  });

  test("Query a non-existing order", async () => {
    const orderIds = orders.map((o) => o.id);
    // Find a non-existing machine ID
    let orderId = 1;
    while (orderIds.includes(orderId)) {
      orderId++;
    }

    const responseNonExistingOrder = await fetch(
      SERVER_URL + `orders/${orderId}`
    );
    expect(responseNonExistingOrder.status).toBe(404);
    const error = await responseNonExistingOrder.json();
    expect(error).toHaveProperty("error", expect.any(String));
  });
});
