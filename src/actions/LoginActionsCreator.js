import * as ActionTypes from './constants'

export const sendDataForLogin = data => {
  return {
    type: ActionTypes.SEND_DATA_TO_LOGIN,
    payload: data
  }
}

export const fetchDataForLogin = (input, callback) => {
  return dispatch => {
    fetch('http://api.bukalelang.id/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    .then(result => { return result.json() })
    .then(fetchResult => {
      dispatch(sendDataForLogin(fetchResult))
      callback(fetchResult)
    })
    .catch(err => { console.log(err) })
  }
}
