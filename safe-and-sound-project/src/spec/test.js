import React from "react";
import renderer from "react-test-renderer";
// import { createUser } from "../api";
const mockFn = jest.fn();
const { sum, mul, sub, div, string } = require("./math.js");
const { createUser, getAllUsers, getBuilding } = require("../../api");

console.log(string);

test("Adding 1 + 1 equals 2", () => {
  expect(sum(1, 1)).toBe(2);
});
// test('Multiplying 1 * 1 equals 1', () => {
//   expect(mul(1, 1)).toBe(1);
// });
// test('Subtracting 1 - 1 equals 0', () => {
//   expect(sub(1, 1)).toBe(0);
// });
// it('Dividing 1 / 1 equals 1', () => {
//   expect(div(1, 1)).toBe(1);

// });

// describe('creats a new user', () => {
//   beforeEach(() => createUser('danny', 'flaskett', 'ello@gmail.com', 'firestarter'));
//   it('creates new user with right details', () => getAllUsers().then((user) => {
//     console.log(user.val(), '$$$$$$$$$$$');
//     console.log(Object.values(user.val()).length, '<<<<<');
//     expect(Object.values(user.val()).length).toBe(57);
//   }));
// });

// it("creates new user with right details", () => {
//   createUser("danny", "flaskett", "fir@gmail.com", "firestarter").then(user => {
//     console.log(user);
//     expect(user.email).toBe("fir@gmail.com");
//   });
// });
// beforeEach(() => {});
// it("hunbjubniunh", () => {
//   getAllUsers().then(building => {
//     console.log(building, "<<<<<<<<");
//   });
// });
