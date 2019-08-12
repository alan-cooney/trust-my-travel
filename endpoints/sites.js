import urlArguments from "../utils/urlArguments";

/**
 * List sites
 */
export async function listSites(axios, options) {
  try {
    const queryString = urlArguments(options);
    const res = await axios.get(`sites${queryString}`);
    return res.data;
  } catch (e) {
    throw new Error("Failed to list sites. " + e.message);
  }
}

/**
 * Update permitted urls
 *
 * @param {Object} axios
 * @param {string} siteId
 * @param {array} permitted_urls
 */
export async function updatePermittedUrls(axios, siteId, permitted_urls) {
  try {
    const res = await axios.put(`sites/${siteId}`, {
      permitted_urls
    });
    return res.data;
  } catch (e) {
    throw new Error("Failed to update permitted urls. " + e.message);
  }
}
