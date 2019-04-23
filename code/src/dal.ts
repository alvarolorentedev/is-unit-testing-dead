const redis = require("async-redis");

export class DAL {
  redisClient: any;

  async connect(address: string): Promise<void> {
    this.redisClient = await redis.createClient(address);
  }

  async disconnect(address: string): Promise<void> {
    await this.redisClient.quit();
  }

  async getUser(name: string): Promise<string> {
    const value = await this.redisClient.get(name);

    return value;
  }
}
