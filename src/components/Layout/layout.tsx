import * as React from "react";

type LayoutComponentParameterType = {
  // TODO: Figure out type of children
  children: any;
};

const LayoutComponent = ({ children }: LayoutComponentParameterType): React.ReactElement => {
  return (
    <>
      <main>
        {children}
      </main>
    </>
  );
};

export default LayoutComponent;
