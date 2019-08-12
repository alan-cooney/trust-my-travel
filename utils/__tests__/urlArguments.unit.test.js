const urlArguments = require("../urlArguments");

test("Return options", () => {
  // Arguments to test, including $%^ which should be encoded
  const testArgs = { page: 1, per_page: 20, search: "hello$%^" };
  const expectedRes = "?page=1&per_page=20&search=hello%24%25%5E";

  const res = urlArguments(testArgs);
  expect(res).toBe(expectedRes);
});

test("Return nothing", () => {
  // Arguments to test, including $%^ which should be encoded
  let testArgs = undefined;
  const expectedRes = "";

  const res = urlArguments(testArgs);
  expect(res).toBe(expectedRes);
});
