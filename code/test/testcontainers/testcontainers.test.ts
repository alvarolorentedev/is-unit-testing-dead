const redis = require("async-redis");
const { GenericContainer } = require("testcontainers");
const { DAL } = require("../../src/dal");
jest.setTimeout(100000);

describe("container", () => {
  let container: any;
  let redisClient: any;

  beforeAll(async () => {
    container = await new GenericContainer("redis", "alpine")
      .withEnv("KEY", "VALUE")
      .withExposedPorts(6379)
      .start();
    redisClient = redis.createClient(
      `redis://localhost:${container.getMappedPort(6379)}`
    );
    await redisClient.set("pepe", "is awesome");
  });

  afterAll(async () => {
    await redisClient.quit();
    await container.stop();
  });

  it(`should return exisiting user`, async () => {
    const dal = new DAL();
    await dal.connect(`redis://localhost:${container.getMappedPort(6379)}`);
    const result = await dal.getUser("pepe");
    expect(result).toEqual("is awesome");
  });
});
