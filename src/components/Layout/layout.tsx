import * as React from "react";

import { NavbarLink } from "../Navbar";
import NavbarComponent from "../Navbar";

type LayoutComponentParameterType = {
  // TODO: Figure out type of children
  children: any;
  currentPage?: NavbarLink;
  putInDIV?: boolean;
};

const LayoutComponent = ({
  children,
  currentPage,
  putInDIV,
}: LayoutComponentParameterType): React.ReactElement => {
  return (
    <>
      <NavbarComponent selected={currentPage} />
      <main>
        {(() => {
          if (putInDIV == undefined || putInDIV) {
            return <div className="container-fluid p-2">{children}</div>;
          } else {
            return children;
          }
        })()}
      </main>
    </>
  );
};

export default LayoutComponent;
