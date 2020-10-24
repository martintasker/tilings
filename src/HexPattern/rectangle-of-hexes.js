export default function rectangleOfHexes(rowCount, rowLength) {
  const tiles = [];
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < rowLength - (row % 2); col++) {
      tiles.push({row, col, color: null});
    }
  }
  return tiles;
}
