import * as React from "react";
import { Link } from "gatsby";

export enum NavbarLink {
  Home,
  Gallery
};

const navbarLinks: string[] = [
  "/",
  "/gallery"
];

type NavbarComponentParameterType = {
  selected?: NavbarLink;
};

const NavbarComponent = ({ selected }: NavbarComponentParameterType): React.ReactElement => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <div className="container-fluid-sm">
          <a className="navbar-brand" href="/">Paint by Number</a>
        </div>
        <ul className="navbar-nav">
          {
            Object.keys(NavbarLink).filter(
              (_: string, index: number) => {
                return index >= Object.keys(NavbarLink).length / 2;
              }
            ).map(
              (value: string, index: number) => {
                if (selected === index) {
                  return (
                    <li className="nav-item">
                      <Link className="nav-link active" to={navbarLinks[index]}>{value}</Link>
                    </li>
                  );
                } else {
                  return (
                    <li className="nav-item">
                      <Link className="nav-link" to={navbarLinks[index]}>{value}</Link>
                    </li>
                  );
                }
              }
            )
          }
        </ul>
      </div>
    </nav>
  );
};

export default NavbarComponent;
