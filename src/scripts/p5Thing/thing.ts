import p5 from "p5";

export class p5Thing {
  protected sketch!: p5;

  public x: number;
  public y: number;

  constructor(sketch: p5) {
    this.sketch = sketch;
    this.x = 0;
    this.y = 0;
  }

  update() {}

  draw() {}
}

// For testing stuff
export class p5TestingRectThing extends p5Thing {
  draw() {
    this.sketch.push();

    this.sketch.fill(0);
    this.sketch.rect(this.x, this.y, 50, 50);

    this.sketch.pop();
  }
}

export class p5ImageThing extends p5Thing {
  public image?: p5.Image;

  constructor(sketch: p5, image?: p5.Image) {
    super(sketch);

    if (image) {
      this.image = image;
    }
  }

  draw() {
    this.sketch.push();

    if (this.image) {
      this.sketch.image(this.image, this.x, this.y);
    }

    this.sketch.pop();
  }
}

export default p5Thing;
