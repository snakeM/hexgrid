import React, { useState } from 'react';
import { Group } from 'react-konva';
import { Hexagon } from './Hexagon';
import { HexLabel } from './HexLabel';

const COLOR_OPEN_HEX = '#D16D68';

const FONT_SIZE_HOVER = 13;
const FONT_SIZE_OPEN = 40;

export function HexagonHover(props) {
  const [isOpen, setOpen] = useState(false);

  const scaleWidth = props.width * props.scale;
  const scaleHeight = props.height * props.scale;
  // Offset the coordinates so that the hexagon appears centered over the other one
  const offsetX = props.coords.x - (scaleWidth - props.width) / 2;
  const offsetY = props.coords.y - (scaleHeight - props.height) / 2;
  const offsetCoords = { x: offsetX, y: offsetY };

  const hexText = isOpen ? 'X' : props.text;
  const textSize = isOpen ? FONT_SIZE_OPEN : FONT_SIZE_HOVER;
  const hexColor = isOpen ? COLOR_OPEN_HEX : props.color;

  return (
    <Group
      onClick={() => {
        props.setClickedHex(props.clickedHex ? null : props);
        setOpen((state) => !state);
      }}
    >
      <Hexagon
        width={scaleWidth}
        height={scaleHeight}
        origin={offsetCoords}
        color={hexColor}
        shadow="enabled"
      />
      <HexLabel
        text={hexText}
        coords={offsetCoords}
        width={scaleWidth}
        height={scaleHeight / 2}
        fontSize={textSize}
      />
    </Group>
  );
}

export default HexagonHover;
