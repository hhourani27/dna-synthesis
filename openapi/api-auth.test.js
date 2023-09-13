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

describe("POST /auth/login", () => {
  test("Request JWT token", async () => {
    const formData = new FormData();
    formData.append("login", "admin");
    formData.append("password", "any_password");

    const response = await fetch(SERVER_URL + "auth/login", {
      method: "POST",
      body: formData,
    });
    expect(response.status).toBe(200);
    const jsonBody = await response.json();
    expect(jsonBody).toHaveProperty("token", expect.any(String));
  });

  test("Auth fails without login nor password", async () => {
    const response = await fetch(SERVER_URL + "auth/login", {
      method: "POST",
    });
    expect(response.status).toBe(401);
  });

  test("Auth fails without login", async () => {
    const formData = new FormData();
    formData.append("password", "any_password");

    const response = await fetch(SERVER_URL + "auth/login", {
      method: "POST",
      body: formData,
    });
    expect(response.status).toBe(401);
  });

  test("Auth fails without password", async () => {
    const formData = new FormData();
    formData.append("login", "admin");

    const response = await fetch(SERVER_URL + "auth/login", {
      method: "POST",
      body: formData,
    });
    expect(response.status).toBe(401);
  });
});
