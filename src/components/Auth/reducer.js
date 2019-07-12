// import { combineReducers } from 'redux'

// ****** ACTION CONSTANTS *******
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const updateLoginStatus = loggedIn => dispatch => dispatch({ type: loggedIn ? LOGIN_SUCCESS : LOGIN_FAILURE })

// ******* REDUCERS ***************

const authState = {
  isAuthenticated: false
}

const auth = (state = authState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true }
    case LOGIN_FAILURE:
      return { ...state, isAuthenticated: false }
    default:
      return state
  }
}

export default auth
