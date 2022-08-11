import * as React from "react";
import type { HeadFC } from "gatsby";

export const HeadComponentFactory = (pageTitle?: string): HeadFC => {
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
