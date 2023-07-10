// pretend this is firebase, netlify, or auth0's code.
// you shouldn't have to implement something like this in your own app

const localStorageKey = '__auth_provider_token__'

async function getToken() {
  // if we were a real auth provider, this is where we would make a request
  // to retrieve the user's token. (It's a bit more complicated than that...
  // but you're probably not an auth provider so you don't need to worry about it).
  return window.localStorage.getItem(localStorageKey)
}

const handleUserResponse = ({user}) => {
  window.localStorage.setItem(localStorageKey, user.token)
  return user
}

const register = (data) => {
  return client('register', data) //.then(handleUserResponse)
}

// an auth provider wouldn't use your client, they'd have their own
// so that's why we're not just re-using the client
// const authURL = process.env.REACT_APP_AUTH_URL
const authURL = "#"

async function client(endpoint, data) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  }

  console.log("Signup POST Request Body - JSON", data)
  return Promise.reject({message: 'Error!'})
}

export {getToken, register, localStorageKey}