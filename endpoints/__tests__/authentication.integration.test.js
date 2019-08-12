import { getToken, refreshToken, deleteToken } from "../authentication";

const config = {
  url: process.env.TMT_URL,
  username: process.env.TMT_USERNAME,
  password: process.env.TMT_PASSWORD
};
var refreshTkn;

test("Get Token", async () => {
  const auth = await getToken(config.url, config.username, config.password);
  refreshTkn = auth.refresh_token;

  // Expect a token
  expect(typeof auth.token).toBe("string");
});

test("Refresh Token", async () => {
  const auth = await refreshToken(config.url, refreshTkn);

  // Expect a token
  expect(typeof auth.token).toBe("string");
});

test("Delete Token", async () => {
  const auth = await deleteToken(config.url, refreshTkn);

  // Expect a token
  expect(auth).toBe("jwt_auth_refresh_token_removed");
});
