import trustMyTravel from "../..";
import bookingMock from "./mocks/booking";

// Global variables
var tmt;
var testBooking;
const testChannel = { id: 73 }; // Leave this one for now

// Setup
beforeAll(async () => {
  tmt = await trustMyTravel({
    url: process.env.TMT_URL,
    username: process.env.TMT_USERNAME,
    password: process.env.TMT_PASSWORD
  });
  testBooking = { ...bookingMock, channels: testChannel.id };
});

test("Create booking", async () => {
  const res = await tmt.createBooking(testBooking);
  testBooking.id = res.id;
  expect(res.firstname).toBe(testBooking.firstname);
});

test("Get booking", async () => {
  const res = await tmt.getBooking(testBooking.id);
  expect(res.firstname).toBe(testBooking.firstname);
});

// Skipped - currently not working with TMT
test.skip("List bookings", async () => {
  const res = await tmt.listBookings();
  // Expect to have results
  expect(res[0].firstname).toBe("string");
});

test("Update booking", async () => {
  const updates = {
    firstname: "changedName",
    date: "2022-05-12",
    content: "Test content"
  };
  const res = await tmt.updateBooking(testBooking.id, {
    ...testBooking,
    ...updates
  });
  expect(res.content).toBe(updates.content);
  expect(res.date).toBe(updates.date);
  expect(res.firstname).toBe(updates.firstname);
});

test("Delete booking", async () => {
  const res = await tmt.deleteBooking(testBooking.id);
  expect(res).toBe("trash");
});
