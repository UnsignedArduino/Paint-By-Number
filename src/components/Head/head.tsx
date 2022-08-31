import type { HeadFC } from "gatsby";
import * as React from "react";

const HeadComponentFactory = (pageTitle?: string): HeadFC => {
  const headComponent = () => {
    return (
      <>
        {pageTitle === "" || pageTitle == undefined ? (
          <title>Paint by Number</title>
        ) : (
          <title>{pageTitle} | Paint by Number</title>
        )}
      </>
    );
  };
  headComponent.displayName = "headComponent";

  return headComponent;
};

export default HeadComponentFactory;
