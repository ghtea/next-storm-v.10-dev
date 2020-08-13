import * as types from './ActionTypes';



export const replaceDataReaction = (which, replacement) => {
  return {
    type: types.REPLACE_DATA_REACTION,
    which: which,
    replacement: replacement
  }
}

export const replaceData2Reaction = (which1, which2, replacement) => {
  return {
    type: types.REPLACE_DATA_2_REACTION,
    which1: which1,
    which2: which2,
    replacement: replacement
  }
}



