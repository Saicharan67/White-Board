import React from 'react'
import { Stage, Layer, Circle } from "react-konva";

const Circle = ()=> {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Circle
            x={20}
            y={50}
            width={100}
            height={100}
            fill="red"
            shadowBlur={5}
          />
        </Layer>
      </Stage>
    );
  }
  export default Circle