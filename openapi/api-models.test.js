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

describe("GET /models", () => {
  test("All fields are present and correct", async () => {
    const response = await fetch(SERVER_URL + "models");
    models = await response.json();

    models.forEach((m) => {
      expect(m).toHaveProperty("id", expect.any(String));
      expect(m).toHaveProperty("wellArraySize");
      expect(m.wellArraySize).toHaveLength(2);
      m.wellArraySize.forEach((n) => {
        expect(n).toBeGreaterThan(0);
      });
    });
  });
});

describe("Get /models/{modelId}", () => {
  test("Query a single model", async () => {
    const responseAllModels = await fetch(SERVER_URL + "models");
    const models = await responseAllModels.json();

    const modelId = models[0].id;
    const responseModel0 = await fetch(SERVER_URL + `models/${modelId}`);
    const model0 = await responseModel0.json();

    expect(model0.id).toBe(modelId);
    expect(model0.wellArraySize).toEqual(models[0].wellArraySize);
  });

  test("Query a non-existing model", async () => {
    const response = await fetch(SERVER_URL + "models/NON-EXISTING-MODEL");
    expect(response.status).toBe(404);
    const error = await response.json();
    expect(error).toHaveProperty("error", expect.any(String));
  });
});
