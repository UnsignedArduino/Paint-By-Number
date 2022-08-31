import p5 from "p5";

import p5Thing, {
  RectangleXYWH,
  calculateBoundingBox,
  p5ImageThing,
} from "../p5Thing";
import PaintSketchImageFormatter from "../PaintSketchImageFormatter";
import {
  PaintSketchParams,
  PaintSketchParamsGetter,
} from "../PaintSketchParams";
import PaintSketchStyle from "../PaintSketchSettings";

enum PaintSketchStates {
  Loading,
  Painting,
  Finished,
  FatalError,
}

class PaintSketch extends p5Thing {
  private style: PaintSketchStyle;

  private state: PaintSketchStates;

  private params!: PaintSketchParams;

  private originalImg?: p5.Image;
  private newImg?: p5.Image;
  private colors?: p5.Color[];

  private camera: p5.Vector;
  private zoom: number;

  private p5things: p5Thing[];
  private boundingBox: RectangleXYWH | undefined;

  constructor(sketch: p5) {
    super(sketch);

    this.camera = this.sketch.createVector(0, 0);
    this.zoom = 1;

    this.p5things = [];
    // // For testing
    // this.p5things.push(new p5TestingRectThing(this.sketch));

    this.style = new PaintSketchStyle(this.sketch);

    this.state = PaintSketchStates.Loading;

    this.params = new PaintSketchParamsGetter(this.sketch).getParams();

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

  update() {
    super.update();

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

    this.boundingBox = calculateBoundingBox(this.p5things);

    const cameraLeftOffset: number =
      this.camera.x + (this.boundingBox.width / 2) * this.zoom;
    const cameraTopOffset: number =
      this.camera.y + (this.boundingBox.height / 2) * this.zoom;
    const cameraRightOffset: number =
      this.boundingBox.x -
      (this.boundingBox.width / 2) * this.zoom -
      this.camera.x +
      this.sketch.width;
    const cameraBottomOffset: number =
      this.boundingBox.y -
      (this.boundingBox.height / 2) * this.zoom -
      this.camera.y +
      this.sketch.height;

    // console.log({
    //   cameraLeftOffset,
    //   cameraTopOffset,
    //   cameraRightOffset,
    //   cameraBottomOffset,
    // });

    if (cameraLeftOffset < 0) {
      this.camera.x += Math.abs(cameraLeftOffset) / 2;
    } else if (cameraRightOffset < 0) {
      this.camera.x -= Math.abs(cameraRightOffset) / 2;
    }
    if (cameraTopOffset < 0) {
      this.camera.y += Math.abs(cameraTopOffset) / 2;
    } else if (cameraBottomOffset < 0) {
      this.camera.y -= Math.abs(cameraBottomOffset) / 2;
    }
  }

  draw() {
    super.draw();

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
    let scaleFactor: number;

    if (deltaY > 0) {
      scaleFactor = 1 - this.style.zoomSensitivity;
    } else {
      scaleFactor = 1 + this.style.zoomSensitivity;
    }

    // https://stackoverflow.com/a/70660569/10291933

    const newZoom: number = this.zoom * scaleFactor;
    if (newZoom > this.style.zoomMin && newZoom < this.style.zoomMax) {
      this.zoom *= scaleFactor;
      this.zoom = Math.min(
        Math.max(this.zoom, this.style.zoomMin),
        this.style.zoomMax
      );

      this.camera.x =
        this.sketch.mouseX -
        this.sketch.mouseX * scaleFactor +
        this.camera.x * scaleFactor;
      this.camera.y =
        this.sketch.mouseY -
        this.sketch.mouseY * scaleFactor +
        this.camera.y * scaleFactor;
    }
    return false;
  }
}

export default PaintSketch;
