import p5 from "p5";
import p5Thing from "../../../p5Thing";

export class ReplacementsP5MovedXY extends p5Thing {
  get movedX(): number {
    return this.sketch.mouseX - this.sketch.pmouseX;
  }

  get movedY(): number {
    return this.sketch.mouseY - this.sketch.pmouseY;
  }

  get moved(): p5.Vector {
    return this.sketch.createVector(this.movedX, this.movedY);
  }
}

export default ReplacementsP5MovedXY;
