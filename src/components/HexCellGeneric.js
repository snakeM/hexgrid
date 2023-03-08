import { Group } from 'react-konva';
import Hexagon from './Hexagon';
import HexLabel from './HexLabel';

export function HexCell_Generic(props){

    return (
        <Group>
            <Hexagon 
            width={props.width} 
            height={props.height} 
            origin={props.origin} 
            color={props.color}
            shadow={props.shadow ?? false}
            />
            <HexLabel 
            text={props.text}
            coords={props.origin}
            width={props.width}
            height={props.height/2}
            fontSize={props.fontSize ?? 14}
            />
                    
        </Group>
    );
}

export default HexCell_Generic;
