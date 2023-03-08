import { defineHex, Grid, rectangle, spiral,} from 'honeycomb-grid';
import { elements } from './progressMapElements';

// Define constants
const HEX_WIDTH = 100;
const HEX_HEIGHT = 110;
const GRID_WIDTH = 14;
const GRID_HEIGHT = 8;

const COLOR_INIT_PHASE = '#b9b8aa';
const COLOR_INIT_PHASE_ACTIVE = '#ecebdc';
const COLOR_GOV_PHASE = '#d3a5d4';
const COLOR_GOV_PHASE_ACTIVE = '#e199e4';
const COLOR_PLAN_PHASE = '#73c8cb';
const COLOR_PLAN_PHASE_ACTIVE = '#1dd0d6';
const COLOR_BUILD_PHASE = '#95c698';
const COLOR_BUILD_PHASE_ACTIVE = '#7bce83';
const COLOR_NOPHASE = '#595959';

function checkGridForTask(taskGrid, point){
    const allHexagons = taskGrid.map(({hex}) => hex);
    var returnValue = false;

    allHexagons.forEach((hexagon) => {
        if (hexagon !== null && hexagon.equals(point)){
            returnValue = true;
        }
    })
    return returnValue;
}

function getPhaseColor(phase, status){
    // status of a task is either 'Active', 'Future' or 'Complete'
    if (phase === "Unimplemented"){
        return COLOR_NOPHASE;
    }
    const inactiveColorMap = new Map([
        ["Initiation", COLOR_INIT_PHASE], 
        ["Governance", COLOR_GOV_PHASE],
        ["Plan & Design", COLOR_PLAN_PHASE],
        ["Build, Test & Deploy", COLOR_BUILD_PHASE],
    ]);

    const activeColorMap = new Map([
        ["Initiation", COLOR_INIT_PHASE_ACTIVE], 
        ["Governance", COLOR_GOV_PHASE_ACTIVE],
        ["Plan & Design", COLOR_PLAN_PHASE_ACTIVE],
        ["Build, Test & Deploy", COLOR_BUILD_PHASE_ACTIVE],
    ]);

    if (status === 'Future'){
        return inactiveColorMap.get(phase);
    } else {
        return activeColorMap.get(phase);
    }
}

export function getTaskHexagons(){
    // Define the properties of Hexagons in the grid
    const hex = defineHex({
        dimensions: {
            height: HEX_HEIGHT, 
            width: HEX_WIDTH
        }, 
        origin: 'topLeft'
    });
    // Define properties of logical hexagon grid
    const grid = new Grid(hex, rectangle({
        width: GRID_WIDTH, 
        height: GRID_HEIGHT
    }));

    // Create an array of 'taskHexagons' which will later be assigned to a hexagon in the grid
    // Set the color of each taskHexagon based on its parent (phase) and status properties
    const taskHexagons = [];
    elements.taskNodes.forEach((taskNode) => {
        taskHexagons.push({
            hex: null,
            title: taskNode.data.title,
            color: getPhaseColor(taskNode.data.parent, taskNode.data.status),
            phase: taskNode.data.parent,
        });
    } );
    
    // "Traverse" the grid - an ordered list of points on the hexagon grid which traverse out in a spiral shape
    // Tasks are grouped by phase - each phase has it's own spiral traverser
    // These are hard coded points on the grid - work can be done to make this more dynamic
    const planPhaseTraverser = grid.traverse(spiral({start: [5,GRID_HEIGHT/2], radius: 5})).toArray();
    const buildPhaseTraverser = grid.traverse(spiral({start: [7,GRID_HEIGHT/2], radius: 6})).toArray();
    const initPhaseTraverser = grid.traverse(spiral({ start: [0, GRID_HEIGHT/2], radius: 1})).toArray();
    const govPhaseTraverser = grid.traverse(spiral({start: [2, GRID_HEIGHT/2], radius: 1})).toArray();
    const unimplementedTraverser = grid.traverse(rectangle({start: [1, 1], width: GRID_WIDTH, height: GRID_HEIGHT})).toArray();

    const phaseMap = new Map([
        ["Initiation", initPhaseTraverser], 
        ["Governance", govPhaseTraverser], 
        ["Plan & Design", planPhaseTraverser], 
        ["Build, Test & Deploy", buildPhaseTraverser], 
        ["Unimplemented", unimplementedTraverser]
    ]);
    
    taskHexagons.forEach(task => {
        const traverser = phaseMap.get(task.phase)
        var point = traverser.shift();
        while (checkGridForTask(taskHexagons, point) === true){
            point = traverser.shift();
        }
        const newHex = grid.createHex(point);
        task.hex = newHex;
    });
    
    return taskHexagons;
}