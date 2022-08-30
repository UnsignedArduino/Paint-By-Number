import p5 from "p5";

export type PaintSketchParams = {
  path: string;
  width: number;
  height: number;
  colors: number;
};

type PaintSketchRawURLParams = {
  path?: string;
  width?: string;
  height?: string;
  colors?: string;
};

export class PaintSketchParamsGetter {
  private sketch: p5;

  public constructor(sketch: p5) {
    this.sketch = sketch;
  }

  public getParams(): PaintSketchParams {
    const rawParams = <PaintSketchRawURLParams>this.sketch.getURLParams();

    const params = <PaintSketchParams>{
      path: rawParams.path ?? "",
      width: Number.parseInt(rawParams.width ?? "0"),
      height: Number.parseInt(rawParams.height ?? "0"),
      colors: Number.parseFloat(rawParams.colors ?? "0"),
    };

    if (params.path == "") {
      throw new TypeError("No path to image has been provided!");
    }
    if (params.width == 0 && params.height == 0) {
      throw new TypeError("No width or height has been provided!");
    }
    if (params.colors == 0) {
      throw new TypeError("No color count has been provided!");
    }

    console.log(params);

    return params;
  }
}

export default PaintSketchParamsGetter;
