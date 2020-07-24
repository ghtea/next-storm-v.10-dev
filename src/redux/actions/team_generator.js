import * as types from './ActionTypes';




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