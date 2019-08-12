const trustMyTravel = require("../..");

// Global variables
var tmt;
var testChannel;

// Setup
beforeAll(async () => {
  tmt = await trustMyTravel({
    url: process.env.TMT_URL,
    username: process.env.TMT_USERNAME,
    password: process.env.TMT_PASSWORD
  });
});

test("Create channel", async () => {
  const randomName = "Test" + Math.floor(Math.random() * 1000);
  const channel = { name: randomName, currencies: "GBP" };
  const res = await tmt.createChannel(channel);
  testChannel = res;
  // Expect currencies and name to match up with input
  expect(res.currencies).toBe(channel.currencies);
  expect(res.name).toBe(channel.name);
});

test("Get channel", async () => {
  const res = await tmt.getChannel(testChannel.id);
  // Expect to equal creation
  expect(res).toEqual(testChannel);
});

test("List channels", async () => {
  const res = await tmt.listChannels();
  // Expect to have results
  expect(typeof res[0].name).toBe("string");
});

test("List channels with 1/page", async () => {
  const res = await tmt.listChannels({ per_page: 1 });
  expect(res.length).toBe(1);
});

test("Update channel", async () => {
  const res = await tmt.updateChannel(testChannel.id, {
    name: testChannel.name,
    currencies: "USD"
  });
  // Expect currency to be updated
  expect(res.currencies).toBe("USD");
});

test("Delete channel", async () => {
  const res = await tmt.deleteChannel(testChannel.id);
  // Expect currency to be updated
  expect(res).toBe(true);
});
