const trustMyTravel = require("../..");

// Global variables
var tmt;
var siteId;

// Setup
beforeAll(async () => {
  tmt = await trustMyTravel({
    url: process.env.TMT_URL,
    username: process.env.TMT_USERNAME,
    password: process.env.TMT_PASSWORD
  });
});

test("List sites", async () => {
  const sites = await tmt.listSites();
  siteId = sites[0].id;
  // Expect at least one site, with a name
  expect(typeof sites[0].name).toBe("string");
});

test("Update permitted urls", async () => {
  const permitted_urls = [
    "https://www.skyhookadventure.com",
    "https://www.guidehook.com"
  ];
  const res = await tmt.updatePermittedUrls(siteId, permitted_urls);
  // Expect the permitted urls to come back
  expect(res.permitted_urls).toEqual(permitted_urls);
});
