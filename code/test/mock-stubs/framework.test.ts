import { Extraterrestrial, Friend } from "../../src/extraterrestial";

test("call fails because someone answers", () => {
  class mockExtraterrestrialFail implements Extraterrestrial {
    callHome(): void {}
  }
  const friend = new Friend(new mockExtraterrestrialFail());
  expect(() => friend.letPhone()).not.toThrow();
});

test("call fails because nobody answers", () => {
  class mockExtraterrestrialFail implements Extraterrestrial {
    callHome(): void {
      throw "nobody answering";
    }
  }
  const friend = new Friend(new mockExtraterrestrialFail());
  expect(() => friend.letPhone()).toThrow("nobody answering");
});
