import urlArguments from "../utils/urlArguments";

export async function getPayment(axios, payment_id) {
  try {
    const res = await axios.get(`payments/${payment_id}`);
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * List payments
 * @param {Object} axios
 * @param {Object} options e.g. {status: future} // Just show payments owing
 */
export async function listPayments(axios, options) {
  try {
    const queryString = urlArguments(options);
    const res = await axios.get(`payments${queryString}`);
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
}
