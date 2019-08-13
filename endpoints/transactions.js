const urlArguments = require("../utils/urlArguments");

/**
 * Create transaction
 * 
 * @param {Object} axios 
 * @param {Object} body {
    channels, // Unique channel id (required)
    bookings: // Array of bookings to allocate to (required)
        [{id, // (required)
          currencies, // (required)
          total, // Total in cents  {integer} (required)
          reference, // Reference for the booking {string} (required)
          allocation: [
            {
              channels, // Integer of channel ID
              currencies,
              amount,
              operator, // "percent" or "flat",
              action, // Whether to allocate or retain the allocation - TODO, work out what this does
              deduction_from_total, // The amount to deduct from the transaction total
              debit, // The amount debited from the master channel
              credit // The amount credited from the master channel
            }
          ]
        }],
    currencies, // 3-letter ISO (required)
    total, // Total in cents, integer (required)
    psp, // The PSP for the transaction (required) - spreedly or test_psp
    payment_methods, // The payment method for the transaction (required) - bank-transfer
    transaction_types, // "authorize", "capture", "purchase", "refund" or "void" (required)
    countries, // 2-digit ISO (required)
    token, // The transaction token (required for caputre)
    attempt_3ds, // Whether to attempt 3ds
    3ds_redirect_url, // URL to redirect to after 3ds
    linked_id, // Unique id of the transaction 
    ip_address,
    bin_number, // Of cardholder
    payee_name, // E.g. cardholder name
    payee_surname, // Surname returned by PSP
    payee_email, // Email of payee
    card_types, // Card type returned by PSP
    forex_rate, // Auto generated anyway?
  }
 */
module.exports.createTransaction = async function createTransaction(
  axios,
  body
) {
  try {
    const res = await axios.post("transactions", body);
    return { ...res.data, __responseTime: res.config.ms };
  } catch (e) {
    throw e.response.data;
  }
};

module.exports.getTransaction = async function getTransaction(
  axios,
  transaction_id
) {
  try {
    const res = await axios.get(`transactions/${transaction_id}`);
    return res.data;
  } catch (e) {
    throw e.response.data;
  }
};

module.exports.listTransactions = async function listTransactions(
  axios,
  options
) {
  try {
    const queryString = urlArguments(options);
    const res = await axios.get(`transactions${queryString}`);
    return res.data;
  } catch (e) {
    throw e.response.data;
  }
};
