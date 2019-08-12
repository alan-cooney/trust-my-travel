/**
 * Create booking
 * 
 * @param {Object} axios 
 * @param {Object} body {
    channels, // Unique channel id (required)
    content, // Description of the booking
    firstname, // (required)
    surname, // (required)
    email, // (required)
    date, // The date of the booking as Y-m-d (required)
    pax,  // Number of people
    reference, // Your reference for the booking - e.g. order number
    total, // Total in cents, integer (required)
    currencies, // 3-letter ISO (required)
    countries // 2-letter ISO that the booking takes place in (required)
  }
 */
module.exports.createBooking = async function createBooking(axios, body) {
  try {
    const res = await axios.post("bookings", body);
    return res.data;
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

module.exports.updateBooking = async function updateBooking(
  axios,
  booking_id,
  body
) {
  try {
    const res = await axios.put(`bookings/${booking_id}`, body);
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

// module.exports. =  async function listBookings(axios, options) {
//   try {
//     const queryString = urlArguments(options);
//     const res = await axios.get(`bookings${queryString}`);
//     console.log(res);
//     return res.data;
//   } catch (e) {
//     throw new Error(e.message);
//   }
// }

module.exports.getBooking = async function getBooking(axios, booking_id) {
  try {
    const res = await axios.get(`bookings/${booking_id}`);
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports.deleteBooking = async function deleteBooking(axios, booking_id) {
  try {
    const res = await axios.delete(`bookings/${booking_id}`);
    return res.data.status;
  } catch (e) {
    throw new Error(e.message);
  }
};
