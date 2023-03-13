/* eslint-disable react/prop-types */
import React from 'react';
import { Line } from 'react-konva';

const STROKE_WIDTH_DEFAULT = 5;
const SHADOW_BLUR_SIZE = 35;
const SHADOW_OPACITY = 0.6;

const COLOR_STROKE_NORMAL = '#23262f';

function getHexCorners(origin, width, height) {
  return [
    origin.x + width, // NE x-coordinate
    origin.y, // NE y-coordinate
    origin.x + width, // SE x-coordinate
    origin.y + 0.5 * height, // SE y-coordinate
    origin.x + 0.5 * width, // S x-coordinate
    origin.y + 0.75 * height, // S y-coordinate
    origin.x, // SW x-coordinate
    origin.y + 0.5 * height, // SW y-coordinate
    origin.x, // NW x-coordinate
    origin.y, // NW y-coordinate
    origin.x + 0.5 * width, // N x-coordinate
    origin.y - 0.25 * height, // N y-coordinate
  ];
}

export function Hexagon(props) {
  const cornerPoints = getHexCorners(props.origin, props.width, props.height);

  return (
    <Line
      points={cornerPoints}
      fill={props.color}
      closed
      stroke={COLOR_STROKE_NORMAL}
      strokeWidth={props.stroke ?? STROKE_WIDTH_DEFAULT}
      shadowEnabled={props.shadow}
      shadowColor="black"
      shadowBlur={SHADOW_BLUR_SIZE}
      shadowOpacity={SHADOW_OPACITY}
      perfectDrawEnabled={false}
    />
  );
}

export default Hexagon;
