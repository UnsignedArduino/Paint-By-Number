import * as React from "react";
import type { HeadFC } from "gatsby";
import HeadComponentFactory from "../components/Head";
import LayoutComponent from "../components/Layout/layout";
import { NavbarLink, navbarID } from "../components/Navbar";
import p5 from "p5";

const currentPage: NavbarLink = -1;

const pageTitle: string = "";

const PaintPage = (): React.ReactElement => {
  // TODO: Figure out how to make node argument to p5 constructor happy
  const sketchElementId: any = "paintSketch";

  new p5((sketch: p5) => {
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
  }, sketchElementId);

  return (
    <LayoutComponent currentPage={currentPage} putInDIV={false}>
      <div
        id={sketchElementId}
        className="container-fluid p-2 flex-grow-1"
      ></div>
    </LayoutComponent>
  );
};

export default PaintPage;

export const Head: HeadFC = HeadComponentFactory(pageTitle);
