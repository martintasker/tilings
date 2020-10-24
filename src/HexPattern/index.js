import React, {useState, useReducer} from 'react';

import './index.css';

import PatternContext from './PatternContext';
import paletteColors from './palette-colors.js';
import rectangleOfHexes from './rectangle-of-hexes';
import SummaryTable from './SummaryTable';
import Palette from './Palette';
import HexCanvas from './HexCanvas';
import patternReducer, {
  initialState as blankPatternState,
  setTiles,
  setTileColor,
} from './pattern.reducer';

const LIGHT_OUTER = false;

const CELL = [
  [7, 2, 5],
  [8, 4, 3],
  [1, 6, 0],
];

// for Esther with love
// reference sizes: Anna 135x220 Rachel 200x192 Eleanor 170x190
const HEX_SIZE = 10; // cm, flat to flat
const ROW_LENGTH = LIGHT_OUTER ? 19 : 18; // outer length
const ROW_COUNT = 21; // one more outer than inner

const initialTiles = rectangleOfHexes(ROW_COUNT, ROW_LENGTH);
let initialPatternState = patternReducer(blankPatternState, setTiles(initialTiles));

for (let row = 0; row <= ROW_COUNT; row++) {
  const patternRow = row % 3;
  for (let col = 0; col <= ROW_LENGTH - (row % 2); col++) {
    const patternCol = (2 * Math.floor(row/2) + col + (LIGHT_OUTER ? 1 : 0)) % 3;
    const paletteIndex = CELL[patternRow][patternCol];
    initialPatternState = patternReducer(initialPatternState, setTileColor(row, col, paletteIndex));
  }
}

console.log(initialPatternState);

export default function HexPattern() {
  const [patternState, dispatchToPatternState] = useReducer(patternReducer, initialPatternState);
  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState(0);

  const {tiles} = patternState;

  return <PatternContext.Provider value={{
    handleHexClick,
    selectedPaletteIndex,
    setSelectedPaletteIndex,
    paletteColors,
  }}>
    <div className="container">
      <div className="pattern">
        <HexCanvas tiles={tiles}/>
      </div>

      <div className="side-bar">
        <SummaryTable hexSize={HEX_SIZE} rowCount={ROW_COUNT} rowLength={ROW_LENGTH}/>
        <Palette colors={paletteColors}/>
      </div>
    </div>
  </PatternContext.Provider>;

  function handleHexClick(e, row, col, colorIndex) {
    if (e.shiftKey) {
      setSelectedPaletteIndex(colorIndex);
    }
    if (!e.shiftKey) {
      dispatchToPatternState(setTileColor(row, col, selectedPaletteIndex));
    }
  }
}
