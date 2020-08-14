import * as types from './ActionTypes';



export const replaceDataPlayer = (which, replacement) => {
  return {
    type: types.REPLACE_DATA_PLAYER,
    which: which,
    replacement: replacement
  }
}

export const replaceData2Player = (which1, which2, replacement) => {
  return {
    type: types.REPLACE_DATA_2_PLAYER,
    which1: which1,
    which2: which2,
    replacement: replacement
  }
}



