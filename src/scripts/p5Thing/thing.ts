import p5 from "p5";

export class p5Thing {
  protected sketch!: p5;

  public x: number;
  public y: number;

  protected _width: number;
  protected _height: number;

  constructor(sketch: p5) {
    this.sketch = sketch;
    this.x = 0;
    this.y = 0;
    this._width = 0;
    this._height = 0;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  public update(): void {}

  public draw(): void {}
}

// For testing stuff
export class p5TestingRectThing extends p5Thing {
  constructor(sketch: p5) {
    super(sketch);
    this._width = 100;
    this._height = 50;
  }

  draw(): void {
    this.sketch.push();

    this.sketch.fill(0);
    this.sketch.rect(this.x, this.y, this._width, this._height);

    this.sketch.pop();
  }
}

export class p5ImageThing extends p5Thing {
  protected _image?: p5.Image;

  constructor(sketch: p5, image?: p5.Image) {
    super(sketch);

    if (image) {
      this.image = image;
    }
  }

  get image(): p5.Image | undefined {
    return this._image;
  }

  set image(image: p5.Image | undefined) {
    this._image = image;
    if (this._image !== undefined) {
      this._width = this._image.width;
      this._height = this._image.height;
    }
  }

  draw(): void {
    this.sketch.push();

    if (this._image) {
      this.sketch.image(this._image, this.x, this.y);
    }

    this.sketch.pop();
  }
}

export interface RectangleXYWH {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RectangleX1Y1X2Y2 {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const RectangleXYWHToX1Y1X2Y2 = (
  rect: RectangleXYWH
): RectangleX1Y1X2Y2 => {
  return <RectangleX1Y1X2Y2>{
    x1: rect.x,
    y1: rect.y,
    x2: rect.x + rect.width,
    y2: rect.y + rect.height,
  };
};

export const RectangleX1Y1X2Y2ToXYWH = (
  rect: RectangleX1Y1X2Y2
): RectangleXYWH => {
  return <RectangleXYWH>{
    x: rect.x1,
    y: rect.y1,
    width: rect.x2 - rect.x1,
    height: rect.y2 - rect.y1,
  };
};

export const calculateBoundingBox = (things: p5Thing[]): RectangleXYWH => {
  const rect: RectangleXYWH = <RectangleXYWH>{
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  for (const thing of things) {
    rect.x = Math.min(rect.x, thing.x);
    rect.y = Math.min(rect.y, thing.y);
    rect.width = Math.max(rect.width, thing.x + thing.width);
    rect.height = Math.max(rect.height, thing.y + thing.height);
  }

  return rect;
};

export default p5Thing;
