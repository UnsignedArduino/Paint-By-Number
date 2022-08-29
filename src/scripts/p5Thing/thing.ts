import p5 from "p5";

export class p5Thing {
  sketch!: p5;

  constructor(sketch: p5) {
    this.sketch = sketch;
  }

  update() {}

  draw() {}
}

// For testing stuff
export class p5TestingRect extends p5Thing {
  draw() {
    this.sketch.push();

    this.sketch.fill(0);
    this.sketch.rect(20, 10, 50, 50);

    this.sketch.pop();
  }
}

export default p5Thing;
