import React, {useContext} from 'react';

import PatternContext from './PatternContext';

export default function HexCanvas({tiles}) {
  const {handleHexClick, paletteColors} = useContext(PatternContext);

  const {width, height} = tiles.reduce(({width, height}, tile) => {
    return {
      width: Math.max(width, 1 + tile.col + 0.5 * (tile.row % 2)),
      height: Math.max(height, 1 + tile.row),
    };
  }, {width: 1, height: 1});

  const viewWidth = width;
  const cos30 = Math.sqrt(0.75);
  const sin30 = 0.5;
  const hexSideLength = 0.5 / cos30;
  const hexPeakHeight = hexSideLength * sin30;
  const viewHeight = hexPeakHeight + height * (hexSideLength + hexPeakHeight);

  const isEven = n => !(n % 2);
  const cx = (row, col) => isEven(row) ? col + 0.5 : col + 1;
  const cy = (row) => hexPeakHeight + 0.5 * hexSideLength + row * (hexPeakHeight + hexSideLength);

  return <>
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      width={25 * width}
      fill="#222"
    >
      {tiles.map(({row, col, color}, index) => <Hex key={index} row={row} col={col} color={color}/>)}
    </svg>
  </>;

  function Hex({row, col, color: colorIndex}) {
    const fill = colorIndex === null ? '#222' : paletteColors[colorIndex];

    const R = 0.5 * Math.sqrt(4/3);
    const pathData = [
      `M${cx(row, col)} ${cy(row)}`,
      `m0.5 -${R/2}`,
      `v${R}`,
      `l-0.5 ${R/2}`,
      `l-0.5 -${R/2}`,
      `v-${R}`,
      `l0.5 -${R/2}`,
      `z`
    ].join(' ');

    return <path
      onClick={handleClick}
      d={pathData}
      fill={fill}
    />

    function handleClick(e) {
      handleHexClick(e, row, col, colorIndex);
    }
  }
}
