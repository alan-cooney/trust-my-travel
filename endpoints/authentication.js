import axios from "axios";

/**
 * Get token
 * @param {string} url
 * @param {string} username
 * @param {string} password
 *
 * @returns {Object} {token, refresh_token...}
 */
export async function getToken(url, username, password) {
  try {
    const res = await axios.post(`${url}/wp-json/jwt-auth/v1/token`, {
      username,
      password
    });
    return res.data;
  } catch (e) {
    throw new Error(
      "Trust My Travel authentication failed with message: " + e.message
    );
  }
}

/**
 * Refresh token
 * @param {string} url
 * @param {string} refreshTkn
 *
 * @returns {Object} {token, refresh_token...}
 */
export async function refreshToken(url, refreshTkn) {
  try {
    const res = await axios.post(
      `${url}/wp-json/jwt-auth/v1/token/refresh`,
      {},
      { headers: { Authorization: `Bearer ${refreshTkn}` } }
    );
    return res.data;
  } catch (e) {
    throw new Error(
      "Trust My Travel refresh token failed with message: " + e.message
    );
  }
}

/**
 * Delete token
 * @param {string} url
 * @param {string} refreshTkn
 *
 * @returns {string} "jwt_auth_refresh_token_removed"
 */
export async function deleteToken(url, refreshTkn) {
  try {
    const res = await axios.delete(`${url}/wp-json/jwt-auth/v1/token/refresh`, {
      headers: { Authorization: `Bearer ${refreshTkn}` }
    });
    return res.data.code;
  } catch (e) {
    throw new Error(
      "Trust My Travel delete token failed with message: " + e.message
    );
  }
}
