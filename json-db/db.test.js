const db = require("./db");

test("hello", () => {
  expect(db.hello()).toBe("hello");
});
