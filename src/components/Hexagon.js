import { Line } from 'react-konva'

const COLOR_STROKE_NORMAL = '#23262f';

function getHexCorners(firstCorner, w, h){
    
    const fx = firstCorner.x;
    const fy = firstCorner.y;
    

    const cornerPoints = 
        [
        (fx+w), (fy),               // NE
        (fx+w), (fy+(0.5*h)),       // SE
        fx+(0.5*w), (fy+(0.75*h)),  // S
        (fx), (fy+(0.5*h)),         // SW
        fx, fy,                     // NW
        (fx+(0.5*w)), (fy-(0.25*h)) // N     
];
    return cornerPoints;
}

export function Hexagon(props){
    const cornerPoints = getHexCorners(props.origin, props.width, props.height);

    return (
          <Line
          points={cornerPoints}
          fill={props.color}
          closed={true}
          stroke={COLOR_STROKE_NORMAL}
          strokeWidth={props.stroke ?? 5}
          shadowEnabled={props.shadow ?? false}
          shadowColor={"black"}
          shadowBlur={15}
          shadowOpacity={0.6}
            />
    );
}

export default Hexagon;
