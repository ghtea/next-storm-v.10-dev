import * as types from './ActionTypes';



export const replaceDataCompGallery = (which, replacement) => {
  return {
    type: types.REPLACE_DATA_COMP_GALLERY,
    which: which,
    replacement: replacement
  }
}

export const replaceData2CompGallery = (which1, which2, replacement) => {
  return {
    type: types.REPLACE_DATA_2_COMP_GALLERY,
    which1: which1,
    which2: which2,
    replacement: replacement
  }
}



export const replaceListPosition = (replacement ) => {
  return {
    type: types.REPLACE_LIST_POSITION,
    replacement : replacement 
  }
}





/*
export const replaceListMap = (replacement ) => {
  return {
    type: types.REPLACE_LIST_MAP,
    replacement : replacement 
  }
}



export const replaceWhichAdding = (replacement) => {
  return {
    type: types.REPLACE_WHICH_ADDING,
    replacement: replacement
  }
}


export const replaceLocationAddingMap = (which, replacement) => {
  return {
    type: types.REPLACE_LOCATION_ADDING_MAP,
    replacement : replacement 
  }
}


export const replaceIdMapChosen = (which, replacement) => {
  return {
    type: types.REPLACE_ID_MAP_CHOSEN,
    replacement : replacement 
  }
}
*/

/*
export const replacePlanTeam = (newPlanTeam) => {
  return {
    type: types.REPLACE_PLAN_TEAM,
    newPlanTeam: newPlanTeam
  }
}


export const addResult = (result) => {
  return {
    type: types.ADD_RESULT,
    result: result
  }
}
export const deleteResult = (idResult) => {
  return {
    type: types.DELETE_RESULT,
    idResult: idResult
  }
}




export const replacePlayerTags = (battletag, tag, true_false) => {
  return {
    type: types.REPLACE_PLAYER_TAGS,
    battletag: battletag,
    tag: tag,
    true_false: true_false
  }
}

export const replacePlayerStatus = (battletag, status) => {
  return {
    type: types.REPLACE_PLAYER_STATUS,
    battletag: battletag,
    status: status
  }
}



export const replaceRegion = (region) => {
  return {
    type: types.REPLACE_REGION,
    region: region
  }
}

export const replaceNumber = (pairNumber, which, how) => {
  return {
    type: types.REPLACE_NUMBER
    ,which: which
    ,how: how
    ,pairNumber: pairNumber
  }
}
*/