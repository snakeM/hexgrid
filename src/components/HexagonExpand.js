import React from 'react';
import { Group, Text } from 'react-konva';
import { Hexagon } from './Hexagon';

const FONT_SIZE_TITLE = 26;
const FONT_SIZE_LINK = 20;
const FONT_SIZE_PROGRESS = 90;
const FONT_FAMILY = 'Calibri';

const TITLE_TEXT_RATIO = 0.35;
const PROGRESS_TEXT_RATIO = 0.55;
const LINK_TEXT_RATIO = 0.1;

const TITLE_TEXT_PADDING = 10;

export function HexagonExpand(props) {
  // Calculating the position of the expanded hexagon so that
  // the close button aligns nicely in the top right corner
  const offsetX = props.coords.x - 0.75 * props.width;
  const offsetY = props.coords.y + 0.3 * props.height;

  const textBoundingBoxHeight = props.height / 2;

  const titleTextHeight = textBoundingBoxHeight * TITLE_TEXT_RATIO;
  const progressTextHeight = textBoundingBoxHeight * PROGRESS_TEXT_RATIO;
  const linkTextHeight = textBoundingBoxHeight * LINK_TEXT_RATIO;

  const progressTextOrigin = offsetY + titleTextHeight;
  const linkTextOrigin = progressTextOrigin + progressTextHeight;

  return (
    <Group>
      <Hexagon
        origin={{ x: offsetX, y: offsetY }}
        height={props.height}
        width={props.width}
        color={props.color}
      />
      <Text
        text={props.text}
        fontSize={FONT_SIZE_TITLE}
        fill="black"
        fontFamily={FONT_FAMILY}
        fontStyle="bold"
        fontVariant="small-caps"
        width={props.width}
        height={titleTextHeight}
        x={offsetX}
        y={offsetY}
        padding={TITLE_TEXT_PADDING}
        align="center"
        verticalAlign="top"
        wrap="word"
      />
      <Text
        text="50%"
        fontSize={FONT_SIZE_PROGRESS}
        fill="black"
        fontFamily={FONT_FAMILY}
        fontStyle="bold"
        fontVariant="small-caps"
        width={props.width}
        height={progressTextHeight}
        x={offsetX}
        y={progressTextOrigin}
        align="center"
        verticalAlign="middle"
        wrap="word"
      />
      <Text
        text="Go to task"
        fontSize={FONT_SIZE_LINK}
        fontFamily={FONT_FAMILY}
        textDecoration="underline"
        fontStyle="italic"
        width={props.width}
        height={linkTextHeight}
        x={offsetX}
        y={linkTextOrigin}
        align="center"
        verticalAlign="middle"
        onClick={() => window.open('https://www.google.com/', '_blank').focus()}
      />
    </Group>
  );
}

export default HexagonExpand;
