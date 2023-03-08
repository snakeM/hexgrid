import { useState } from 'react';
import { Stage, Layer, } from 'react-konva'
import { getTaskHexagons } from '../HexagonLogic'
import HexCell from './HexCell';
import HexagonHover from './HexagonHover';
import HexagonExpand from './HexagonExpand';


export function HexGrid(props){

    const [hoverHex, setHoverHex] = useState(null);
    const [clickedHex, setClickedHex] = useState(null);
  
    const taskHexagons = getTaskHexagons();

    const render = [];

    taskHexagons.forEach((task) => {
        render.push(<HexCell 
            origin={task.hex.corners[4]}
            width={task.hex.width}
            height={task.hex.height}
            data={task.data}
            title={task.title}
            color={task.color} 
            hoverHex={hoverHex} 
            setHoverHex={setHoverHex} 
            clickedHex={clickedHex}
            />);
    });

    return(
          <Stage width={window.innerWidth} height={window.innerHeight}>
              <Layer>
                {render}
              </Layer>
              <Layer>
                {hoverHex && <HexagonHover
                  coords={hoverHex.origin}
                  width={hoverHex.width}
                  height={hoverHex.height}
                  scale={1.2}
                  text={hoverHex.title}
                  color={hoverHex.color}
                  clickedHex={clickedHex} setClickedHex={setClickedHex}
                  />}
              </Layer>
              <Layer>
                {clickedHex && <HexagonExpand
                  coords={{x: (clickedHex.coords.x), y: (clickedHex.coords.y)}}
                  width={400}
                  height={440}
                  text={clickedHex.text}
                  color={clickedHex.color}
                  clickedHex={clickedHex} setClickedHex={setClickedHex}
                />} 
              </Layer>
          </Stage> 
      );
}

export default HexGrid;