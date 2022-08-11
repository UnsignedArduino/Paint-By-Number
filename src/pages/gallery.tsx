import * as React from "react";
import type { HeadFC } from "gatsby";
import HeadComponentFactory from "../components/Head";
import LayoutComponent from "../components/Layout/layout";
import { NavbarLink } from "../components/Navbar";

const currentPage: NavbarLink = NavbarLink.Gallery;

const pageTitle: string = NavbarLink[currentPage];

const IndexPage = (): React.ReactElement => {
  return (
    <LayoutComponent currentPage={ currentPage }>
    
    </LayoutComponent>
  );
};

export default IndexPage;

export const Head: HeadFC = HeadComponentFactory(pageTitle);
