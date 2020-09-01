import * as types from './ActionTypes';



export const replaceDataHero = (which, replacement) => {
  return {
    type: types.REPLACE_DATA_HERO,
    which: which,
    replacement: replacement
  }
}

export const replaceData2Hero = (which1, which2, replacement) => {
  return {
    type: types.REPLACE_DATA_2_HERO,
    which1: which1,
    which2: which2,
    replacement: replacement
  }
}



