import { navbarID } from "../../components/Navbar";
import p5 from "p5";
import p5Thing from "../p5Thing";
import PaintSketchStyle from "../PaintSketchStyle";
import PaintSketchImageFormatter from "../PaintSketchImageFormatter";

enum PaintSketchStates {
  Loading,
  Painting,
  Finished,
  FatalError,
}

type PaintSketchParams = {
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

class PaintSketch extends p5Thing {
  private style: PaintSketchStyle;

  private state: PaintSketchStates;

  private params!: PaintSketchParams;

  private originalImg?: p5.Image;
  private newImg?: p5.Image;
  private colors?: p5.Color[];

  constructor(sketch: p5) {
    super(sketch);
    this.style = new PaintSketchStyle(this.sketch);

    this.state = PaintSketchStates.Loading;

    this.getAndVerifyParams();

    this.originalImg = undefined;
    this.sketch.loadImage(
      this.params.path,
      (img: p5.Image) => {
        console.info("Downloaded image successfully");
        this.originalImg = img;

        const formatter = new PaintSketchImageFormatter(this.sketch);
        const result = formatter.formatImage(
          this.originalImg,
          this.params.width,
          this.params.height,
          this.params.colors
        );

        this.newImg = result.image;
        this.colors = result.colors;

        this.newImg.resize(0, this.sketch.height);

        this.state = PaintSketchStates.Painting;
      },
      () => {
        this.state = PaintSketchStates.FatalError;
        throw new TypeError("Failed to get image!");
      }
    );
  }

  getAndVerifyParams(): void {
    const params = <PaintSketchRawURLParams>this.sketch.getURLParams();

    this.params = <PaintSketchParams>{};
    this.params.path = params.path ?? "";
    this.params.width = Number.parseInt(params.width ?? "0");
    this.params.height = Number.parseInt(params.height ?? "0");
    this.params.colors = Number.parseInt(params.colors ?? "0");

    if (this.params.path == "") {
      this.state = PaintSketchStates.FatalError;
      throw new TypeError("No path to image has been provided!");
    }
    if (this.params.width == 0 && this.params.height == 0) {
      this.state = PaintSketchStates.FatalError;
      throw new TypeError("No width or height has been provided!");
    }
    if (this.params.colors == 0) {
      this.state = PaintSketchStates.FatalError;
      throw new TypeError("No color count has been provided!");
    }

    console.log("Path: " + this.params.path);
    console.log("Width: " + this.params.width);
    console.log("Height: " + this.params.height);
    console.log("Colors: " + this.params.colors);
  }

  update() {
    super.update();
    this.style.update();
  }

  draw() {
    super.draw();
    this.style.draw();

    this.sketch.background(this.style.bgColor);

    switch (this.state) {
      case PaintSketchStates.Loading: {
        break;
      }
      case PaintSketchStates.Painting: {
        this.sketch.image(this.newImg!, 0, 0);
      }
      case PaintSketchStates.Finished: {
        break;
      }
      case PaintSketchStates.FatalError: {
        break;
      }
    }
  }
}

const PaintSketchFactory = () => {
  return (sketch: p5) => {
    const resizeCanvas = () => {
      const sketchParent: HTMLElement =
        sketch.drawingContext.canvas.parentElement;
      const navbar: HTMLElement | null = document.getElementById(navbarID);

      sketch.resizeCanvas(sketchParent.offsetWidth, window.innerHeight);

      const newWidth =
        sketchParent.scrollWidth -
        (sketchParent.scrollWidth - sketchParent.offsetWidth);

      const newHeight: number =
        window.innerHeight -
        (sketchParent.scrollHeight - window.innerHeight) -
        (navbar?.offsetHeight ?? 0);

      console.log("Fitting to " + newWidth + ", " + newHeight);

      sketch.resizeCanvas(newWidth, newHeight);
    };

    let paintSketch: PaintSketch | undefined = undefined;

    sketch.setup = () => {
      sketch.createCanvas(100, 100);
      resizeCanvas();

      paintSketch = new PaintSketch(sketch);
    };

    sketch.draw = () => {
      if (!paintSketch) {
        throw new TypeError(
          "Paint sketch has not been initalized, yet drawing has started!"
        );
      }
      paintSketch.update();
      paintSketch.draw();
    };

    sketch.windowResized = () => {
      resizeCanvas();
    };
  };
};

export default PaintSketchFactory;
