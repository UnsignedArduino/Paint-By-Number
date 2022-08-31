import { Link } from "gatsby";
import * as React from "react";

export enum NavbarLink {
  Home,
  Gallery,
}

export const navbarID = "navbar";

const navbarLinks: string[] = ["/", "/gallery"];

type NavbarComponentParameterType = {
  selected?: NavbarLink;
};

const NavbarComponent = ({
  selected,
}: NavbarComponentParameterType): React.ReactElement => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark" id={navbarID}>
      <div className="container-fluid">
        <div className="container-fluid-sm">
          <a className="navbar-brand" href="/">
            Paint by Number
          </a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            {Object.keys(NavbarLink)
              .filter((_: string, index: number) => {
                return index >= Object.keys(NavbarLink).length / 2;
              })
              .map((value: string, index: number) => {
                if (selected === index) {
                  return (
                    <li className="nav-item" key={value}>
                      <Link className="nav-link active" to={navbarLinks[index]}>
                        {value}
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li className="nav-item" key={value}>
                      <Link className="nav-link" to={navbarLinks[index]}>
                        {value}
                      </Link>
                    </li>
                  );
                }
              })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
