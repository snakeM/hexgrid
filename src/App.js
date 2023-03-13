import React from 'react';
import { HexGrid } from './components/HexGrid';
import { getTaskHexagons } from './HexagonLogic';

function App() {
  const taskHexagons = getTaskHexagons();

  return (
    <div>
      <HexGrid tasks={taskHexagons} />
    </div>
  );
}

export default App;
