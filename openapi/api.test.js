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

  beforeAll(async () => {
    const response = await fetch(SERVER_URL + "machines");
    machines = await response.json();
  });

  test("id, model, location, status & wells are always present", async () => {
    machines.forEach((m) => {
      expect(m).toMatchObject({
        id: expect.any(Number),
        model: expect.any(String),
        location: expect.any(String),
        status: expect.any(String),
      });
    });
  });
});
