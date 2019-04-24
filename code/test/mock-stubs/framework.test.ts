import { Friend } from "../../src/extraterrestial";

describe("et", () => {
  let mockAlien: any;

  beforeAll(async () => {
    mockAlien = jest.fn(() => ({
      callHome: jest.fn()
    }))();
  });

  it("call fails because someone answers", () => {
    const result = new Friend(mockAlien);
    expect(result.letPhone()).toEqual(undefined);
  });

  it("call fails because nobody answers", () => {
    mockAlien.callHome.mockImplementation(() => {
      throw "nobody answering";
    });
    const result = new Friend(mockAlien);
    try {
      result.letPhone();
    } catch (error) {
      expect(error).toEqual("nobody answering");
    }
  });
});
