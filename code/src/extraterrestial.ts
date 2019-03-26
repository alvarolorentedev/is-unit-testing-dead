export interface Extraterrestrial {
  callHome(): void;
}

function call(): void {}

export class ET implements Extraterrestrial {
  callHome(): void {
    call();
  }
}

export class Friend {
  alien: Extraterrestrial;
  constructor(alien: Extraterrestrial) {
    this.alien = alien;
  }

  letPhone(): void {
    this.alien.callHome();
  }
}
