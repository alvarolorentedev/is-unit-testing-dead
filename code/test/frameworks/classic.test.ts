import { add } from "../../src/add";
import faker from "faker";

test("adds 1 + 2 to equal 3", () => {
  const second = faker.random.number();
  const first = faker.random.number();
  expect(add(first, second)).toBe(first + second);
});
