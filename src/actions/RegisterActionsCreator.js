import * as ActionTypes from './constants'

export const sendDataForRegister = data => {
  return {
    type: ActionTypes.SEND_DATA_TO_REGISTER,
    payload: data
  }
}

export const fetchDataForRegister = (input, callback) => {
  return dispatch => {
    fetch('http://api.bukalelang.id/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    .then(result => { return result.json() })
    .then(fetchResult => {
      dispatch(sendDataForRegister(fetchResult))
      callback(fetchResult)
    })
    .catch(err => { console.log(err) })
  }
}
