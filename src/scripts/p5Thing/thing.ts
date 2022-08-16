import p5 from "p5";

export class p5Thing {
  sketch!: p5;

  constructor(sketch: p5) {
    this.sketch = sketch;
  }

  update() {}

  draw() {}
}

export default p5Thing;
