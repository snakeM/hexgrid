import React from 'react';
import { Text } from 'react-konva';

const FONT_FAMILY = 'Calibri';

export function HexLabel(props) {
  const padding = 10;

  return (
    <Text
      text={props.text}
      fontSize={props.fontSize}
      fill="black"
      fontFamily={FONT_FAMILY}
      fontStyle="bold"
      x={props.coords.x + padding}
      y={props.coords.y}
      width={props.width - padding * 2}
      height={props.height}
      align="center"
      verticalAlign="middle"
    />
  );
}

export default HexLabel;
