import { cost } from "../../src/cost";
import faker from "faker";

test("if its home apply discount", () => {
  const distance = faker.random.number(1000);
  const result = distance * 0.03 * 0.2;
  expect(cost(distance, true)).toBe(result);
});

test("if its not home dont apply discount", () => {
  const distance = faker.random.number(1000);
  const result = distance * 0.03;
  expect(cost(distance, false)).toBe(result);
});
