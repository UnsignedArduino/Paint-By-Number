import type { HeadFC } from "gatsby";
import * as React from "react";

const HeadComponentFactory = (pageTitle?: string): HeadFC => {
  return () => {
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
};

export default HeadComponentFactory;
