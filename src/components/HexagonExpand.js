import Hexagon from "./Hexagon"
import { Group, Text } from "react-konva";

export function HexagonExpand(props){
    
    const offsetX = props.coords.x - (0.75*props.width);
    const offsetY = props.coords.y + (0.3*props.height);

    return (
        <Group>

            <Hexagon
            origin={{x: offsetX, y: offsetY}}
            height={props.height}
            width={props.width}
            color={props.color}
            shadow={true}
            />

            <Text 
            text={props.text} 
            fontSize={26} 
            fill="black"
            fontFamily='Calibri'
            fontStyle='bold' 
            fontVariant='small-caps'
            x={offsetX}
            y={offsetY}
            width={props.width}
            height={props.height}
            align="center" 
            verticalAlign="top"
            wrap="word"
            />
            <Text 
            text="50%" 
            fontSize={90} 
            fill="black"
            fontFamily='Calibri'
            fontStyle='bold' 
            fontVariant='small-caps'
            x={offsetX}
            y={offsetY+80}
            width={props.width}
            height={90}
            align="center" 
            verticalAlign="middle"
            wrap="word"
            />

            <Text
            text="Go to task"
            fontSize={16}
            fontFamily='Calibri'
            textDecoration='underline'
            fontStyle='italic'
            x={offsetX}
            y={offsetY+200}
            width={props.width}
            height={20}
            align="center"
            verticalAlign='middle'
            onClick={()=>window.open("https://www.google.com/", '_blank').focus()}
            /> 
        </Group>
    );
}

export default HexagonExpand;