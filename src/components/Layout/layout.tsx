import * as React from "react";
import { NavbarLink } from "../Navbar";
import NavbarComponent from "../Navbar";

type LayoutComponentParameterType = {
  // TODO: Figure out type of children
  children: any;
  currentPage?: NavbarLink;
};

const LayoutComponent = ({ children, currentPage }: LayoutComponentParameterType): React.ReactElement => {
  return (
    <>
      <main>
      <NavbarComponent selected={currentPage}/>
        {children}
      </main>
    </>
  );
};

export default LayoutComponent;
