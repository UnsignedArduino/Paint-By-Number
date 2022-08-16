import * as React from "react";

const SketchWrapper = (
  // TODO: Figure out how to have sketch strongly typed without importing p5
  { sketchFunc }: { sketchFunc: any }
): React.ReactElement => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const p5 = require("p5");
    const sketch = new p5(sketchFunc, canvasRef.current);
    return () => {
      sketch.remove();
    };
  }, []);

  return (
    <div ref={canvasRef} className="container-fluid p-2 flex-grow-1"></div>
  );
};

export default SketchWrapper;
