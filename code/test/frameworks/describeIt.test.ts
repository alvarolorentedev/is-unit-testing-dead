import { add } from "../../src/add";
import faker from "faker";

describe("add function", () => {
  let result: number;
  let expected: number;

  beforeAll(() => {
    const second = faker.random.number();
    const first = faker.random.number();
    expected = first + second;
    result = add(first, second);
  });

  it(`should return addition`, () => {
    expect(result).toBe(expected);
  });
});
