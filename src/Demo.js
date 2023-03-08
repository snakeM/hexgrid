import { Stage, Layer, Rect, Line} from 'react-konva'
import HexCellGeneric from './components/HexCellGeneric';
import { useState,  } from 'react';
import { Grid, defineHex, rectangle, spiral } from 'honeycomb-grid';
import HexCell from './components/HexCell';
import Hexagon from './components/Hexagon';

export function Demo(props){

  const hex = defineHex({dimensions: {height: 80, width: 80}, origin: 'topLeft'});
  const grid = new Grid(hex, rectangle({width: 12, height: 10}));
  
  const render = [];
  grid.forEach((hexagon) => {
    // Add all corner points to a single array
    const cornerCoords = [];
    hexagon.corners.map((coord) => cornerCoords.push(coord.x, coord.y));
    // `render` will contain an array of Line components which will be rendered to a canvas
    render.push(<Line
      points={cornerCoords}
      fill="#1dd0d6"
      closed={true}
      stroke="black"
      strokeWidth={4}
    />)

    // render.push(<HexCellGeneric
    //   width={hexagon.width}
    //   height={hexagon.height}
    //   origin={hexagon.corners[4]}
    //   color="#8ed89d"
    //   text={`${hexagon.q}, ${hexagon.r}`}
    //   fontSize={16}
    // />)
  });


  // Render all hexagons to a canvas; 
    return (
        <div>
          <Stage width={window.innerWidth} height={window.innerHeight} draggable={true}>
            <Layer>
              <HexCell
              
              />
            </Layer>
          </Stage>
        </div>
      );
}

export default Demo;