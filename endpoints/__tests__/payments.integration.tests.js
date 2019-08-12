const trustMyTravel = require("../..");
const bookingMock = require("./mocks/booking");
const transactionMock = require("./mocks/transaction");

// Global variables
var tmt;
const testChannel = { id: 73 }; // Leave this one for now
var testBooking;
var testTransaction;
var testPaymentIds;

// Setup
beforeAll(async () => {
  tmt = await trustMyTravel({
    url: process.env.TMT_URL,
    username: process.env.TMT_USERNAME,
    password: process.env.TMT_PASSWORD
  });

  testBooking = { ...bookingMock, channels: testChannel.id };
  testBooking = await tmt.createBooking(testBooking);
  testTransaction = {
    ...transactionMock,
    channels: testChannel.id,
    bookings: [{ ...transactionMock.bookings[0], id: testBooking.id }]
  };
  testTransaction = await tmt.createTransaction(testTransaction);
  testPaymentIds = testTransaction.payment_ids;
});

test("Get payment", async () => {
  const res = await tmt.getPayment(testPaymentIds[0]);
  expect(res.id).toBe(testPaymentIds[0]);
});

test("List payments", async () => {
  const res = await tmt.listPayments();
  // Expect to have results
  expect(res.length > 0).toBeTruthy();
  expect(res[0].id > 1).toBeTruthy();
});
