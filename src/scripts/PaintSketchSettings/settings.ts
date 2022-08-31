import p5 from "p5";

import p5Thing from "../p5Thing";

const bgColor: string = "white";

const zoomSensitivity: number = 0.1;
const zoomMin = 0.1;
const zoomMax = 10;

export class PaintSketchSettings extends p5Thing {
  readonly bgColor: p5.Color;

  readonly zoomSensitivity: number;
  readonly zoomMin: number;
  readonly zoomMax: number;

  constructor(sketch: p5) {
    super(sketch);

    this.bgColor = this.sketch.color(bgColor);

    this.zoomSensitivity = zoomSensitivity;
    this.zoomMin = zoomMin;
    this.zoomMax = zoomMax;
  }
}

export default PaintSketchSettings;
