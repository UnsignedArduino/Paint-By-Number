import { navbarID } from "../../components/Navbar";
import p5 from "p5";

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

    sketch.setup = () => {
      sketch.createCanvas(100, 100);
      resizeCanvas();
    };

    sketch.draw = () => {
      sketch.background(0);

      sketch.push();
      sketch.fill(255);
      sketch.circle(sketch.mouseX, sketch.mouseY, 10);
      sketch.pop();
    };

    sketch.windowResized = () => {
      resizeCanvas();
    };
  };
};

export default PaintSketchFactory;
