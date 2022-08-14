import * as React from "react";
import p5 from "p5";

type SketchWrapperParameterTypes = {
  sketchFunc: (sketch: p5) => void;
  // TODO: Figure out how to make node argument to p5 constructor happy
  canvasID: any;
};

const SketchWrapper = ({
  sketchFunc,
  canvasID,
}: SketchWrapperParameterTypes): React.ReactElement => {
  React.useEffect(() => {
    const sketch = new p5(sketchFunc, canvasID);

    return () => {
      sketch.remove();
    };
  }, []);

  return <div id={canvasID} className="container-fluid p-2 flex-grow-1"></div>;
};

export default SketchWrapper;
