import * as React from "react";
import type { HeadFC } from "gatsby";
import HeadComponentFactory from "../components/Head";

const IndexPage = (): React.ReactElement => {
  return (
    <>
    </>
  );
}

export default IndexPage;

export const Head: HeadFC = HeadComponentFactory("Home");
