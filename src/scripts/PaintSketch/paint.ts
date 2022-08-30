import { navbarID } from "../../components/Navbar";
import p5 from "p5";
import p5Thing, { p5ImageThing, p5TestingRectThing } from "../p5Thing";
import PaintSketchStyle from "../PaintSketchStyle";
import PaintSketchImageFormatter from "../PaintSketchImageFormatter";
import { ReplacementsP5MovedXY } from "../Replacements/p5/movedXY";

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
  private moved: ReplacementsP5MovedXY;
  private replacements: p5Thing[];

  private style: PaintSketchStyle;

  private state: PaintSketchStates;

  private params!: PaintSketchParams;

  private originalImg?: p5.Image;
  private newImg?: p5.Image;
  private colors?: p5.Color[];

  private camera: p5.Vector;
  private zoom: number;

  private p5things: p5Thing[];

  constructor(sketch: p5) {
    super(sketch);

    this.moved = new ReplacementsP5MovedXY(this.sketch);
    this.replacements = [this.moved];

    this.camera = this.sketch.createVector(0, 0);
    this.zoom = 1;

    this.p5things = [];
    // // For testing
    // this.p5things.push(new p5TestingRectThing(this.sketch));

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

        // For testing
        this.p5things.push(new p5ImageThing(this.sketch, this.newImg));

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

    for (const replacement of this.replacements) {
      replacement.update();
    }

    this.style.update();

    switch (this.state) {
      case PaintSketchStates.Loading: {
        break;
      }
      case PaintSketchStates.Painting: {
        break;
      }
      case PaintSketchStates.Finished: {
        break;
      }
      case PaintSketchStates.FatalError: {
        break;
      }
    }

    for (const thing of this.p5things) {
      thing.update();
    }
  }

  draw() {
    super.draw();

    for (const replacement of this.replacements) {
      replacement.draw();
    }

    this.style.draw();

    this.sketch.push();
    this.sketch.translate(this.camera);
    this.sketch.scale(this.zoom);

    this.sketch.background(this.style.bgColor);

    for (const thing of this.p5things) {
      thing.draw();
    }

    this.sketch.pop();
  }

  mousePressed(): boolean {
    return true;
  }

  mouseDragged(movedX: number, movedY: number): boolean {
    this.camera.add(this.sketch.createVector(movedX, movedY));
    return false;
  }

  mouseReleased(): boolean {
    return true;
  }

  mouseWheel(deltaY: number): boolean {
    let scale_factor: number;

    if (deltaY > 0) {
      scale_factor = 1 - this.style.zoomSensitivity;
    } else {
      scale_factor = 1 + this.style.zoomSensitivity;
    }

    // https://stackoverflow.com/a/70660569/10291933

    const new_zoom: number = this.zoom * scale_factor;
    if (new_zoom > this.style.zoomMin && new_zoom < this.style.zoomMax) {
      this.zoom *= scale_factor;
      this.zoom = Math.min(
        Math.max(this.zoom, this.style.zoomMin),
        this.style.zoomMax
      );

      this.camera.x =
        this.sketch.mouseX -
        this.sketch.mouseX * scale_factor +
        this.camera.x * scale_factor;
      this.camera.y =
        this.sketch.mouseY -
        this.sketch.mouseY * scale_factor +
        this.camera.y * scale_factor;
    }
    return false;
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
