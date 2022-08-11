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
        <div className="container-fluid p-3">
          {children}
        </div>
      </main>
    </>
  );
};

export default LayoutComponent;
