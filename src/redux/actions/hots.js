import * as types from './ActionTypes';



export const replaceDataHots = (which, replacement) => {
  return {
    type: types.REPLACE_DATA_HOTS,
    which: which,
    replacement: replacement
  }
}

export const replaceData2Hots = (which1, which2, replacement) => {
  return {
    type: types.REPLACE_DATA_2_HOTS,
    which1: which1,
    which2: which2,
    replacement: replacement
  }
}



