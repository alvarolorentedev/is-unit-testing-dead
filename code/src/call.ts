const request = require("request-promise-native");

export class Phone {
  baseaddress: string;
  constructor(baseaddress: string) {
    this.baseaddress = baseaddress;
  }

  public async call(number: number) {
    return await request({
      method: "GET",
      uri: `${this.baseaddress}/call/${number}`,
      json: true
    });
  }
}
