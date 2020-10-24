const TYPES = {
  SET_TILES: 'SET_TILES',
  SET_COLOR: 'SET_COLOR',
};

export const initialState = {
  tiles: [],
};

export default function reducer(state, action) {
  const {type} = action;
  switch(type) {

    case TYPES.SET_TILES: {
      const {tiles} = action.payload;
      return {
        ...state,
        tiles,
      }
    }

    case TYPES.SET_COLOR: {
      const {row, col, color} = action.payload;
      return {
        ...state,
        tiles: state.tiles.map(tile => {
          if (tile.row !== row || tile.col !== col) {
            return tile;
          }
          console.log("SET_COLOR", {row, col, color});
          return {...tile, color};
        }),
      };
    }

    default: return state;
  }
}

export const setTiles = tiles => ({type: TYPES.SET_TILES, payload: {tiles}});
export const setTileColor = (row, col, color) => ({type: TYPES.SET_COLOR, payload: {row, col, color}});
