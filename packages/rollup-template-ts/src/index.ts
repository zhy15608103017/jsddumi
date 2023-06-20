import { resolve } from "path";

export class Momo {
  name: string;
  age: number;

  constructor() {
    this.name = 'momo';
    this.age = 18;
  }

  callMe() {
    console.log(`${this.name} ${this.age}`);
  }
}

