import { navbarID } from "../../components/Navbar";
import p5 from "p5";
import p5Thing from "../p5Thing";
import PaintSketchStyle from "../PaintSketchStyle";

class PaintSketch extends p5Thing {
  style: PaintSketchStyle;

  constructor(sketch: p5) {
    super(sketch);
    this.style = new PaintSketchStyle(this.sketch);
  }

  update() {
    super.update();
    this.style.update();
  }

  draw() {
    super.draw();
    this.style.draw();

    this.sketch.background(this.style.bgColor);
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
