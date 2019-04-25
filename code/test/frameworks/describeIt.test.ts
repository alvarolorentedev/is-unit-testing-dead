import { cost } from "../../src/cost";
import faker from "faker";

describe("call", () => {
  const distance: number = faker.random.number();
  let isHome: boolean;

  describe("home", () => {
    let result: number;
    let expected: number;
    
    beforeAll(() => {
      isHome = true;
      expected = distance * 0.03 * 0.2;
      result = cost(distance, isHome);
    });

    it(`should apply discount`, () => {
      expect(result).toBe(expected);
    });
  });
  //...
});
