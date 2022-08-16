import p5 from "p5";
import p5Thing from "../p5Thing";

const bgColor: string = "white";

export class PaintSketchStyle extends p5Thing {
  readonly bgColor: p5.Color;

  constructor(sketch: p5) {
    super(sketch);

    this.bgColor = this.sketch.color(bgColor);
  }
}

export default PaintSketchStyle;
