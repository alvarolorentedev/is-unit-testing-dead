const sqlite3 = require("sqlite3").verbose();

describe("in memory db", () => {
  let db: any;

  beforeAll(async () => {
    db = new sqlite3.Database(":memory:");
    await new Promise((resolve, reject) =>
      db.run("CREATE TABLE phones (name TEXT, phone TEXT)", () => resolve())
    );
    var stmt = db.prepare("INSERT INTO phones VALUES (?,?)");
    stmt.run("Home", "123456");

    await new Promise((resolve, reject) => stmt.finalize(() => resolve()));
  });

  afterAll(async () => {
    db.close();
  });

  it(`should return exisiting user`, async () => {
    await new Promise((resolve, reject) =>
      db.each(
        "SELECT * FROM lorem where name = 'Home'",
        function(_: any, row: any) {
          expect(row.phone).toEqual("123456");
        },
        () => resolve()
      )
    );
  });
});
