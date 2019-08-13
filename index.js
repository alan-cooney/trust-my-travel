const { getToken } = require("./endpoints/authentication");
const { listSites, updatePermittedUrls } = require("./endpoints/sites");
const axiosModule = require("axios");
const axiosTimed = require("axios-timed");
const {
  createChannel,
  getChannel,
  updateChannel,
  listChannels,
  deleteChannel
} = require("./endpoints/channels");
const {
  createBooking,
  updateBooking,
  getBooking,
  // listBookings,
  deleteBooking
} = require("./endpoints/bookings");
const {
  createTransaction,
  getTransaction,
  listTransactions
} = require("./endpoints/transactions");
const { getPayment, listPayments } = require("./endpoints/payments");
const { listStatements, getStatement } = require("./endpoints/statements");

/**
 * trustMyTravel
 * Initialise with tmt = trustMyTravel({url, username, password})
 * Then use the public methods returned below
 * @param {Object} config {url, username, password}
 */
module.exports = async function trustMyTravel({ url, username, password }) {
  // Authenticate
  const credentials = await getToken(url, username, password);

  // Create an axios instance
  let axios = axiosModule.create({
    baseURL: url + "/wp-json/tmt/v2",
    timeout: 10000, // 10 seconds
    headers: { Authorization: `Bearer ${credentials.token}` }
  });
  axiosTimed(axios); // Add response.config.ms with time take

  // Return public methods
  return {
    // Sites
    listSites: async () => listSites(axios),
    updatePermittedUrls: async (siteId, permitted_urls) =>
      updatePermittedUrls(axios, siteId, permitted_urls),

    // Channels
    createChannel: async channel => createChannel(axios, channel),
    updateChannel: async (channel_id, { name, currencies }) =>
      updateChannel(axios, channel_id, { name, currencies }),
    getChannel: async channel_id => getChannel(axios, channel_id),
    listChannels: async options => listChannels(axios, options),
    deleteChannel: async channel_id => deleteChannel(axios, channel_id),

    // Bookings - list currently not working (TMT responds with empty data array)
    createBooking: async body => createBooking(axios, body),
    updateBooking: async (booking_id, body) =>
      updateBooking(axios, booking_id, body),
    getBooking: async booking_id => getBooking(axios, booking_id),
    // listBookings: async options => listBookings(axios, options),
    deleteBooking: async booking_id => deleteBooking(axios, booking_id),

    // Transactions
    createTransaction: async body => createTransaction(axios, body),
    getTransaction: async transaction_id =>
      getTransaction(axios, transaction_id),
    listTransactions: async options => listTransactions(axios, options),

    // Payments
    getPayment: async payment_id => getPayment(axios, payment_id),
    listPayments: async options => listPayments(axios, options),

    // Statements
    getStatement: async statement_id => getStatement(axios, statement_id),
    listStatements: async options => listStatements(axios, options)
  };
};
