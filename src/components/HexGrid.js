import React, { useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { HexCell } from './HexCell';
import { HexagonHover } from './HexagonHover';
import { HexagonExpand } from './HexagonExpand';

const HOVER_HEX_SCALE = 1.2;
const LARGE_HEX_WIDTH = 400;
const LARGE_HEX_HEIGHT = 440;
const TOP_LEFT_CORNER = 4;

export function HexGrid(props) {
  const [hoverHex, setHoverHex] = useState(null);
  const [clickedHex, setClickedHex] = useState(null);

  const taskHexagons = props.tasks;

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {taskHexagons.map((task) => (
          <HexCell
            key={task.hex}
            origin={task.hex.corners[TOP_LEFT_CORNER]}
            width={task.hex.width}
            height={task.hex.height}
            data={task.data}
            title={task.title}
            color={task.color}
            hoverHex={hoverHex}
            setHoverHex={setHoverHex}
            clickedHex={clickedHex}
          />
        ))}
      </Layer>
      <Layer>
        {hoverHex && (
          <HexagonHover
            coords={hoverHex.origin}
            width={hoverHex.width}
            height={hoverHex.height}
            scale={HOVER_HEX_SCALE}
            text={hoverHex.title}
            color={hoverHex.color}
            clickedHex={clickedHex}
            setClickedHex={setClickedHex}
          />
        )}
      </Layer>
      <Layer>
        {clickedHex && (
          <HexagonExpand
            coords={{ x: clickedHex.coords.x, y: clickedHex.coords.y }}
            width={LARGE_HEX_WIDTH}
            height={LARGE_HEX_HEIGHT}
            text={clickedHex.text}
            color={clickedHex.color}
            clickedHex={clickedHex}
            setClickedHex={setClickedHex}
          />
        )}
      </Layer>
    </Stage>
  );
}

export default HexGrid;
