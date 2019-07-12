import { combineReducers } from 'redux'
import get from 'lodash/get'

// ****** ACTION CONSTANTS *******
export const UPDATE_CURRENT_USER = 'APP/UPDATE_CURRENT_USER'
export const UPDATE_CURRENT_USER_PERMISSIONS = 'APP/UPDATE_CURRENT_USER_PERMISSIONS'
export const UPDATE_CURRENT_USER_ROLE = 'APP/UPDATE_CURRENT_USER_ROLE'
export const UPDATE_TENANT = 'APP/UPDATE_TENANT'

// ******* REDUCERS ***************

const tenantState = {
  id: null,
  title: '',
  domain: '',
  logoUrl: '',
  settings: {}
}

// Payload: object with id, email, firstName, lastName, etc.
export const updateCurrentUser = payload => dispatch => dispatch({ type: UPDATE_CURRENT_USER, payload })
export const updateCurrentUserPerms = payload => dispatch => dispatch({ type: UPDATE_CURRENT_USER_PERMISSIONS, payload })
export const updateCurrentUserRole = payload => dispatch => dispatch({ type: UPDATE_CURRENT_USER_ROLE, payload })

export const updateTenant = payload => dispatch => dispatch({ type: UPDATE_TENANT, payload })

// TODO: move this to User Component section when it exists
const currentUserState = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  fullName: '',
  role: '',
  permissions: {},
  settings: {},
  userRoles: []
}

const currentUser = (state = currentUserState, action) => {
  let role
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      role = get(action, 'payload.userRoles[0].role.type', '')
      return { ...state, role, ...action.payload }
    case UPDATE_CURRENT_USER_PERMISSIONS:
      return { ...state, permissions: { ...state.permissions, ...action.payload } }
    case UPDATE_CURRENT_USER_ROLE:
      role = get(action, 'payload.userRoles[0].role.type', '')
      return { ...state, role, userRoles: { ...state.userRoles, ...action.payload } }
    default:
      return state
  }
}

const tenant = (state = tenantState, action) => {
  switch (action.type) {
    case UPDATE_TENANT:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default combineReducers({ tenant, currentUser })
