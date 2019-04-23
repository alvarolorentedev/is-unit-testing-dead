import { cost } from "../../src/cost";
import faker from "faker";

describe("cost", () => {
  let result: number;
  let expected: number;

  beforeAll(() => {
    const distance = faker.random.number();
    expected = distance * 0.03 * 0.2;
    result = cost(distance, true);
  });

  it(`should apply discount`, () => {
    expect(result).toBe(expected);
  });
});
