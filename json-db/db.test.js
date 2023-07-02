const db = require("./db");

test("Test Oligos generation", () => {
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
