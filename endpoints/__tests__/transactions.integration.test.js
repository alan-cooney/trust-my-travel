import trustMyTravel from "../..";
import bookingMock from "./mocks/booking";
import transactionMock from "./mocks/transaction";

// Global variables
var tmt;
const testChannel = { id: 73 }; // Leave this one for now
var testBookingBody;
var testBooking;
var testTransactionBody;
var testTransaction;

// Setup
beforeAll(async () => {
  tmt = await trustMyTravel({
    url: process.env.TMT_URL,
    username: process.env.TMT_USERNAME,
    password: process.env.TMT_PASSWORD
  });
  testBookingBody = { ...bookingMock, channels: testChannel.id };
  testBooking = await tmt.createBooking(testBookingBody);
  testTransactionBody = {
    ...transactionMock,
    channels: testChannel.id,
    bookings: [{ ...transactionMock.bookings[0], id: testBooking.id }]
  };
});

test("Create transaction", async () => {
  const res = await tmt.createTransaction(testTransactionBody);
  testTransaction = res;
  expect(res.status).toBe("complete");
});

// Test several transactions#
test("Multiple transactions simultaneously", async end => {
  jest.setTimeout(30000);
  let testBook = [];
  let testTrans = [];
  var tests = [];
  let number = 5;
  for (let i = 0; i < number; i++) {
    tests.push(i);
  }

  let promises = tests.map(async (item, i) => {
    try {
      testBook[i] = await tmt.createBooking(testBookingBody);
      const body = {
        ...testTransactionBody,
        bookings: [{ ...testTransactionBody.bookings[0], id: testBook[i].id }]
      };
      testTrans[i] = await tmt.createTransaction(body);
      return testTrans[i].status + " " + testTrans[i].__responseTime;
    } catch (e) {
      return "Failed";
    }
  });

  const res = await Promise.all(promises);
  console.log(res);
  expect(res.length).toBe(number);

  await end();
});

test("Get transaction", async () => {
  const res = await tmt.getTransaction(testTransaction.id);
  expect(res.currencies).toBe("GBP");
});

test("List transactions", async () => {
  const res = await tmt.listTransactions();
  expect(typeof res[0].id).toBe("number");
});
