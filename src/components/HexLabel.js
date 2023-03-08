import { Text } from 'react-konva';

export function HexLabel(props){

    const padding = 10;

    return (
        <Text 
            text={props.text} 
            fontSize={props.fontSize} 
            fill="black"
            fontFamily='Calibri' 
            fontStyle='bold' 
            x={props.coords.x+padding}
            y={props.coords.y}
            width={props.width-padding*2}
            height={props.height}
            align="center" 
            verticalAlign="middle"
            />
    )
}

export default HexLabel;