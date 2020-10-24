import React, {useContext} from 'react';
import PatternContext from './PatternContext';

export default function Palette({colors}) {

  return <div className="palette">
    <p>Colours:</p>
    <div>
      {colors.map((color, index) => <Swatch key={index} color={color} colorIndex={index}/>)}
    </div>
  </div>;
}

function Swatch({color, colorIndex}) {
  const {selectedPaletteIndex, setSelectedPaletteIndex} = useContext(PatternContext);
  const isSelected = colorIndex === selectedPaletteIndex;

  return <div onClick={() => setSelectedPaletteIndex(colorIndex)} style={{
    display: 'inline-block',
    width: '3em',
    height: '3em',
    backgroundColor: color,
    borderBottom: isSelected ? '2px solid white' : 'none',
  }}/>
}
