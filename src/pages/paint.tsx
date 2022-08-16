import * as React from "react";
import type { HeadFC } from "gatsby";
import HeadComponentFactory from "../components/Head";
import LayoutComponent from "../components/Layout/layout";
import SketchWrapper from "../components/SketchWrapper";
import { NavbarLink } from "../components/Navbar";
import PaintSketchFactory from "../scripts/PaintSketch";
import p5 from "p5";

const currentPage: NavbarLink = -1;

const pageTitle: string = "";

const PaintPage = (): React.ReactElement => {
  const sketchElementId: string = "paintSketch";

  const sketchFunc: (sketch: p5) => void = PaintSketchFactory();

  return (
    <LayoutComponent currentPage={currentPage} putInDIV={false}>
      <SketchWrapper sketchFunc={sketchFunc} />
    </LayoutComponent>
  );
};

export default PaintPage;

export const Head: HeadFC = HeadComponentFactory(pageTitle);
