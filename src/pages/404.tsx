import type { HeadFC } from "gatsby";
import * as React from "react";

import HeadComponentFactory from "../components/Head";
import LayoutComponent from "../components/Layout/layout";
import { NavbarLink } from "../components/Navbar";

const currentPage: NavbarLink = -1;

const pageTitle = "Page not found";

const GalleryPage = (): React.ReactElement => {
  return (
    <LayoutComponent currentPage={currentPage}>
      <h1>Page not found</h1>
      <p>Sorry, there's nothing here.</p>
    </LayoutComponent>
  );
};

export default GalleryPage;

export const Head: HeadFC = HeadComponentFactory(pageTitle);
