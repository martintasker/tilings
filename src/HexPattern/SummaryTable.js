import React from 'react';

export default function SummaryTable({hexSize, rowCount, rowLength}) {
  const cos30 = Math.sqrt(0.75);
  const sin30 = 0.5;
  const hexSideLength = hexSize / 2 / cos30;
  const totalLength = hexSize * rowLength;
  const hexPeakHeight = hexSideLength * sin30;
  const totalHeight = hexPeakHeight + rowCount * (hexSideLength + hexPeakHeight);
  const hexCount = rowLength * rowCount - Math.floor(rowCount / 2);
  const halfHexCount = 2 * Math.floor(rowCount / 2);

  return <div className="summary-table">
    <table>
      <tbody>
        <Fact name="Hex size" value={`${hexSize}cm flat to flat, ${round(hexSideLength)}cm side`}/>
        <Fact name="Row length" value={`${rowLength}, implies ${totalLength}cm total`}/>
        <Fact name="Row count" value={`${rowCount}, implies ${round(totalHeight)}cm total`}/>
        <Fact name="Hexes needed" value={`${hexCount} whole, ${halfHexCount} half`}/>
      </tbody>
    </table>
  </div>;
}

function Fact({name, value}) {
  return <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
}

function round(x) {
  return Math.floor(x * 10) / 10;
}
