// SEND DATA TO LOGIN
export const SendDataForLogin = (input, callback) => {
  fetch('http://api.bukalelang.id/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  })
  .then(result => {
    return result.json()
  })
  .then(fetchResult => {
    callback(fetchResult)
  })
  .catch(err => {
    console.log(err)
  })
}

// SEND DATA TO REGISTER
export const SendDataForRegister = (input, callback) => {
  fetch('http://api.bukalelang.id/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  })
  .then(result => {
    return result.json()
  })
  .then(fetchResult => {
    callback(fetchResult)
  })
  .catch(err => {
    console.log(err)
  })
}
