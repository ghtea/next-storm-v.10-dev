import * as types from './ActionTypes';



export const replaceDataHots = (which, newData) => {
  return {
    type: types.REPLACE_DATA_HOTS,
    which: which,
    data: newData
  }
}

export const replaceData2Hots = (which1, which2, newData) => {
  return {
    type: types.REPLACE_DATA_2_HOTS,
    which1: which1,
    which2: which2,
    data: newData
  }
}



