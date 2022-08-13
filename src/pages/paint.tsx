import * as React from "react";
import type { HeadFC } from "gatsby";
import HeadComponentFactory from "../components/Head";
import LayoutComponent from "../components/Layout/layout";
import SketchWrapper from "../components/SketchWrapper";
import { NavbarLink, navbarID } from "../components/Navbar";
import p5 from "p5";

const currentPage: NavbarLink = -1;

const pageTitle: string = "";

const PaintPage = (): React.ReactElement => {
  const sketchElementId: string = "paintSketch";

  const sketchFunc: (sketch: p5) => void = (sketch: p5) => {
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

    let i = 0;

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

  return (
    <LayoutComponent currentPage={currentPage} putInDIV={false}>
      <SketchWrapper sketchFunc={sketchFunc} canvasID={sketchElementId} />
    </LayoutComponent>
  );
};

export default PaintPage;

export const Head: HeadFC = HeadComponentFactory(pageTitle);
