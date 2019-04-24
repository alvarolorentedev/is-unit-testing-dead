import { Phone } from "../../src/call";

describe("cost", () => {
  let phone: Phone;

  beforeAll(() => {
    phone = new Phone("http://localhost:4547");
  });

  it(`should apply discount`, async () => {
    expect(await phone.call(12345)).toEqual({
      calling: "alien family"
    });
  });
});
