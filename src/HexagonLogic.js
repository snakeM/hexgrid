/* eslint-disable object-curly-newline */
import { Grid, rectangle, spiral, defineHex } from 'honeycomb-grid';
import { elements } from './progressMapElements';

// Define constants
const HEX_WIDTH = 100;
const HEX_HEIGHT = 110;
const GRID_WIDTH = 14;
const GRID_HEIGHT = 8;

const INIT_TRAVERSER_ORIGIN_POINT = { col: 2, row: GRID_HEIGHT / 2 };
const GOV_TRAVERSER_ORIGIN_POINT = { col: 4, row: GRID_HEIGHT / 2 };
const PLAN_TRAVERSER_ORIGIN_POINT = { col: 7, row: GRID_HEIGHT / 2 };
const BUILD_TRAVERSER_ORIGIN_POINT = { col: 10, row: GRID_HEIGHT / 2 };
const NO_TRAVERSER_ORIGIN_POINT = { col: 1, row: 1 };

const INIT_TRAVERSER_RADIUS = 1;
const GOV_TRAVERSER_RADIUS = 1;
const PLAN_TRAVERSER_RADIUS = 6;
const BUILD_TRAVERSER_RADIUS = 6;

const COLOR_INIT_PHASE = '#b9b8aa';
const COLOR_INIT_PHASE_ACTIVE = '#ecebdc';
const COLOR_GOV_PHASE = '#d3a5d4';
const COLOR_GOV_PHASE_ACTIVE = '#e199e4';
const COLOR_PLAN_PHASE = '#73c8cb';
const COLOR_PLAN_PHASE_ACTIVE = '#1dd0d6';
const COLOR_BUILD_PHASE = '#95c698';
const COLOR_BUILD_PHASE_ACTIVE = '#7bce83';
const COLOR_NOPHASE = '#595959';

function checkGridForTask(taskGrid, point) {
  const allHexagons = taskGrid.map(({ hex }) => hex);

  const returnValue = allHexagons.some((hexagon) => hexagon !== null && hexagon.equals(point));

  return returnValue;
}

function getPhaseColor(phase, status) {
  // status of a task is either 'Active', 'Future' or 'Complete'
  if (phase === 'Unimplemented') {
    return COLOR_NOPHASE;
  }
  const inactiveColorMap = new Map([
    ['Initiation', COLOR_INIT_PHASE],
    ['Governance', COLOR_GOV_PHASE],
    ['Plan & Design', COLOR_PLAN_PHASE],
    ['Build, Test & Deploy', COLOR_BUILD_PHASE],
  ]);

  const activeColorMap = new Map([
    ['Initiation', COLOR_INIT_PHASE_ACTIVE],
    ['Governance', COLOR_GOV_PHASE_ACTIVE],
    ['Plan & Design', COLOR_PLAN_PHASE_ACTIVE],
    ['Build, Test & Deploy', COLOR_BUILD_PHASE_ACTIVE],
  ]);

  if (status === 'Future') {
    return inactiveColorMap.get(phase);
  }
  return activeColorMap.get(phase);
}

export function getTaskHexagons() {
  // Define the properties of Hexagons in the grid
  const hex = defineHex({
    dimensions: {
      height: HEX_HEIGHT,
      width: HEX_WIDTH,
    },
    origin: 'topLeft',
  });
  // Define properties of logical hexagon grid
  const grid = new Grid(
    hex,
    rectangle({
      width: GRID_WIDTH,
      height: GRID_HEIGHT,
    }),
  );

  // "Traverse" the grid - an ordered list of points on the hexagon grid which traverse out
  // in a spiral shape
  // Tasks are grouped by phase - each phase has it's own spiral traverser
  // The origin points of the traversers are currently hard coded -
  // work can be done to make this more dynamic
  const planPhaseTraverser = grid
    .traverse(
      spiral({
        start: PLAN_TRAVERSER_ORIGIN_POINT,
        radius: PLAN_TRAVERSER_RADIUS,
      }),
    )
    .toArray();
  const buildPhaseTraverser = grid
    .traverse(
      spiral({
        start: BUILD_TRAVERSER_ORIGIN_POINT,
        radius: BUILD_TRAVERSER_RADIUS,
      }),
    )
    .toArray();
  const initPhaseTraverser = grid
    .traverse(
      spiral({
        start: INIT_TRAVERSER_ORIGIN_POINT,
        radius: INIT_TRAVERSER_RADIUS,
      }),
    )
    .toArray();
  const govPhaseTraverser = grid
    .traverse(
      spiral({
        start: GOV_TRAVERSER_ORIGIN_POINT,
        radius: GOV_TRAVERSER_RADIUS,
      }),
    )
    .toArray();
  const unimplementedTraverser = grid
    .traverse(
      rectangle({
        start: NO_TRAVERSER_ORIGIN_POINT,
        width: GRID_WIDTH,
        height: GRID_HEIGHT,
      }),
    )
    .toArray();

  const phaseMap = new Map([
    ['Initiation', initPhaseTraverser],
    ['Governance', govPhaseTraverser],
    ['Plan & Design', planPhaseTraverser],
    ['Build, Test & Deploy', buildPhaseTraverser],
    ['Unimplemented', unimplementedTraverser],
  ]);

  // Create an array of 'taskHexagons' Each taskHexagon represents a task with a
  // unique hexagon in the grid.
  // Set the color of each taskHexagon based on its parent (phase) and status properties
  const taskHexagons = [];
  elements.taskNodes.forEach((taskNode) => {
    const traverser = phaseMap.get(taskNode.data.parent);
    let point = traverser.shift();
    while (checkGridForTask(taskHexagons, point)) {
      point = traverser.shift();
    }
    const newHex = grid.createHex(point);
    taskHexagons.push({
      hex: newHex,
      id: taskNode.data.id,
      title: taskNode.data.title,
      color: getPhaseColor(taskNode.data.parent, taskNode.data.status),
      phase: taskNode.data.parent,
    });
  });

  return taskHexagons;
}

export default getTaskHexagons;
