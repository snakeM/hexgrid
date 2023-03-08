import { useState } from 'react'
import { Group, } from 'react-konva'
import Hexagon from './Hexagon'
import HexLabel from './HexLabel';

const COLOR_CLOSE_HEX = '#D16D68'

export function HexagonHover(props){

    const [isOpen, setOpen] = useState(false);
    
    const scaleWidth = props.width * props.scale;
    const scaleHeight = props.height * props.scale;
    // Offset the coordinates so that the hexagon appears centered over the other one
    const offsetX = props.coords.x - ((scaleWidth-props.width)/2);
    const offsetY = props.coords.y - ((scaleHeight-props.height)/2);
    const offsetCoords = {x: offsetX, y: offsetY};

    var hexText = isOpen ? "X" : props.text
    var textSize = isOpen ? 40 : 13
    var hexColor = isOpen ? COLOR_CLOSE_HEX : props.color

    return (
        <Group
        onClick={() => { 
            props.setClickedHex(props.clickedHex ? null : props)
            setOpen((state) => !state)
        }}>
            <Hexagon
            width={scaleWidth}
            height={scaleHeight}
            origin={offsetCoords}
            color={hexColor}
            shadow={'enabled'}
            />
            <HexLabel
            text={hexText}
            coords={offsetCoords}
            width={scaleWidth}
            height={scaleHeight/2}
            fontSize={textSize}
            />
        </Group>
    );
}

export default HexagonHover;