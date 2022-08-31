import type { HeadFC } from "gatsby";
import p5 from "p5";
import * as React from "react";

import HeadComponentFactory from "../components/Head";
import LayoutComponent from "../components/Layout/layout";
import { NavbarLink } from "../components/Navbar";
import SketchWrapper from "../components/SketchWrapper";
import PaintSketchFactory from "../scripts/PaintSketchFactory/factory";

const currentPage: NavbarLink = -1;

const pageTitle = "";

const PaintPage = (): React.ReactElement => {
  const sketchFunc: (sketch: p5) => void = PaintSketchFactory();

  return (
    <LayoutComponent currentPage={currentPage} putInDIV={false}>
      <SketchWrapper sketchFunc={sketchFunc} />
    </LayoutComponent>
  );
};

export default PaintPage;

export const Head: HeadFC = HeadComponentFactory(pageTitle);
