import { resolve } from "path";

export class Momo {
  name;
  age;

  constructor() {
    this.name = 'momo';
    this.age = 18;
    console.log('momo', resolve('./dist/momo.js'));
  }

  callMe() {
    console.log(`${this.name} ${this.age}`);
  }
}

