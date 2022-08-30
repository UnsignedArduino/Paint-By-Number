import { navbarID } from "../../components/Navbar";
import p5 from "p5";
import PaintSketch from "../PaintSketch/paint";

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

    let lastTouch: Touch | undefined = undefined;
    let last2Touches: Touch[] = [];

    sketch.mousePressed = () => {
      return paintSketch?.mousePressed();
    };

    sketch.touchStarted = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        lastTouch = event.touches[0];
      } else if (event.touches.length === 2) {
        last2Touches = [event.touches[0], event.touches[1]];
      }
    };

    sketch.mouseDragged = (event: MouseEvent) => {
      return paintSketch?.mouseDragged(event.movementX, event.movementY);
    };

    sketch.touchMoved = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        const thisTouch: Touch = event.touches[0];
        if (lastTouch == undefined) {
          lastTouch = thisTouch;
        } else {
          if (lastTouch.identifier === thisTouch.identifier) {
            const movedX = thisTouch.clientX - lastTouch.clientX;
            const movedY = thisTouch.clientY - lastTouch.clientY;
            lastTouch = thisTouch;
            return paintSketch?.mouseDragged(movedX, movedY);
          }
        }
      } else if (event.touches.length === 2) {
        const these2Touches: Touch[] = [event.touches[0], event.touches[1]];
        if (last2Touches.length !== 2) {
          last2Touches = [...these2Touches];
        } else {
          const idsAreSame = (
            touches1: Touch[],
            touches2: Touch[]
          ): boolean => {
            if (touches1.length !== touches2.length) {
              return false;
            } else {
              for (let i = 0; i < touches1.length; i++) {
                if (touches1[i].identifier !== touches2[i].identifier) {
                  return false;
                }
              }
              return true;
            }
          };

          const distOf2Touches = (touches: Touch[]): number => {
            if (touches.length !== 2) {
              return 0;
            } else {
              return sketch
                .createVector(touches[0].clientX, touches[0].clientY)
                .dist(
                  sketch.createVector(touches[1].clientX, touches[1].clientY)
                );
            }
          };

          if (idsAreSame(last2Touches, these2Touches)) {
            return paintSketch?.mouseWheel(
              distOf2Touches(last2Touches) - distOf2Touches(these2Touches)
            );
          }
        }
      }
      return false;
    };

    sketch.mouseReleased = () => {
      return paintSketch?.mouseReleased();
    };

    sketch.mouseWheel = (event: WheelEvent) => {
      return paintSketch?.mouseWheel(event.deltaY);
    };
  };
};

export default PaintSketchFactory;
