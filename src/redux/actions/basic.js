import * as types from './ActionTypes';


export const replaceReady = (which, true_false) => {
  return {
    type: types.REPLACE_READY,
    which: which,
    true_false: true_false
  }
}

export const replaceLoading = (which, true_false) => {
  return {
    type: types.REPLACE_LOADING,
    which: which,
    true_false: true_false
  }
}

export const replaceWorking = (which, true_false) => {
  return {
    type: types.REPLACE_WORKING,
    which: which,
    true_false: true_false
  }
}


export const replaceAuthority = (which, authority) => {
  return {
    type: types.REPLACE_AUTHORITY,
    which: which,
    authority: authority
  }
}




export const replaceData = (which, newData) => {
  return {
    type: types.REPLACE_DATA,
    which: which,
    data: newData
  }
}

export const replaceData2 = (which1, which2, newData) => {
  return {
    type: types.REPLACE_DATA_2,
    which1: which1,
    which2: which2,
    data: newData
  }
}



export const addNotification = (situation, message, idNotification) => {
  return {
    type: types.ADD_NOTIFICATION,
    situation: situation,
    message: message,
    idNotification: idNotification
  }
}

export const deleteNotification = (idNotification) => {
  return {
    type: types.DELETE_NOTIFICATION,
    idNotification: idNotification
  }
}

