const sqlite3 = require("sqlite3").verbose();

describe("in memory db", () => {
  let db: any;

  beforeAll(async () => {
    db = new sqlite3.Database(":memory:");
    await new Promise((resolve, reject) =>
      db.run("CREATE TABLE lorem (info TEXT)", () => resolve())
    );
    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
    }
    await new Promise((resolve, reject) => stmt.finalize(() => resolve()));
  });

  afterAll(async () => {
    db.close();
  });

  it(`should return exisiting user`, async () => {
    await new Promise((resolve, reject) =>
      db.each(
        "SELECT rowid AS id, info FROM lorem where id = 1",
        function(_: any, row: any) {
          expect(row.info).toEqual("Ipsum 0");
        },
        () => resolve()
      )
    );
  });
});
