import React from 'react';
import { Group } from 'react-konva';
import { Hexagon } from './Hexagon';
import { HexLabel } from './HexLabel';

const FONT_SIZE = 11;

export function HexCell(props) {
  return (
    <Group
      onMouseEnter={() => {
        if (props.clickedHex === null) {
          props.setHoverHex(props);
        }
      }}
    >
      <Hexagon
        origin={props.origin}
        width={props.width}
        height={props.height}
        color={props.color}
        shadow={false}
      />
      <HexLabel
        text={props.title}
        // Start label bounding box in the top left corner of the hex
        coords={props.origin}
        width={props.width}
        height={props.height / 2}
        fontSize={FONT_SIZE}
      />
    </Group>
  );
}

export default HexCell;
