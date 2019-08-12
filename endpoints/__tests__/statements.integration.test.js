const trustMyTravel = require("../..");

// Global variables
var tmt;

beforeAll(async () => {
  tmt = await trustMyTravel({
    url: process.env.TMT_URL,
    username: process.env.TMT_USERNAME,
    password: process.env.TMT_PASSWORD
  });
});

// Can't test as there are no statements
test.skip("Get statement", async () => {
  const res = await tmt.getStatement("???testid???");
  expect(res.id).toBe("???testid???");
});

test("List statements", async () => {
  const res = await tmt.listStatements();
  // Expect to have results, or return []
  expect(
    res.length > 0 || JSON.stringify(res) === JSON.stringify([])
  ).toBeTruthy();
});
