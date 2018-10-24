import React from "react";
import renderer from "react-test-renderer";
// import { createUser } from "../api";
const { sum, mul, sub, div, string } = require("./math.js");
const { createUser } = require("../../api");

console.log(string);

test("Adding 1 + 1 equals 2", () => {
  expect(sum(1, 1)).toBe(2);
});
test("Multiplying 1 * 1 equals 1", () => {
  expect(mul(1, 1)).toBe(1);
});
test("Subtracting 1 - 1 equals 0", () => {
  expect(sub(1, 1)).toBe(0);
});
it("Dividing 1 / 1 equals 1", () => {
  expect(div(1, 1)).toBe(1);
});

it("creates new user with right details", () => {
  return createUser(
    "danny",
    "flaskett",
    "firestart@gmail.com",
    "firestarter"
  ).then(user => {
    expect(Object.values(user.email).toBe("firestart@gmail.com"));
  });
});
