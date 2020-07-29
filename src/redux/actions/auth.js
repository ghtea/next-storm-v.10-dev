import * as types from './ActionTypes';



export const replaceDataAuth = (which, replacement) => {
  return {
    type: types.REPLACE_DATA_AUTH,
    which: which,
    replacement: replacement
  }
}

export const replaceData2Auth = (which1, which2, replacement) => {
  return {
    type: types.REPLACE_DATA_2_AUTH,
    which1: which1,
    which2: which2,
    replacement: replacement
  }
}

