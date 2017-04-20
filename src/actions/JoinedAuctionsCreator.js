import axios from 'axios'
import * as ActionTypes from './constants'

export const sendDataToCreateAuction = data => {
  return {
    type: ActionTypes.LOAD_JOINED_AUCTION,
    payload: data
  }
}

export const fetchDataForGetJoinedAuctionsData = input => {
  return dispatch => {
    let dataInput = { userId: input.id, token: input.token }
    axios.get('http://api.bukalelang.id/users/' + dataInput.userId + '/auctions-joined', {headers: dataInput})
      .then(
        // response => console.log(response)
        response => dispatch(sendDataToCreateAuction(response.data.auctionsJoined))
      )
      .catch(error => console.log(error))
  }
}
