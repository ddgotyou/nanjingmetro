// import Cookies from 'js-cookie'
// import axios from 'axios'

const TokenKey = 'Admin-Token'

export function getToken() {
  // return Cookies.get(TokenKey)
  const oauthToken = JSON.parse(sessionStorage.getItem(TokenKey))
  return oauthToken
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  // axios.defaults.headers['Authorization'] = 'Bearer ' + token

  return sessionStorage.setItem(TokenKey, JSON.stringify(token))
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  return sessionStorage.clear()
}

