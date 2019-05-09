import {
  FETCH_PROFILE,
  PROFILE_SIGN_OUT,
} from '../actions/types'

const initState = {
  email: '',
  // userId: '',
  // widgetCalculations: [],
}

function profileReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_PROFILE:
      console.log('[ProfileReducer] got a FETCH_WIDGETS_DB action')
      return { ...state, email: action.payload }
    case PROFILE_SIGN_OUT:
      console.log('[ProfileReducer] got a PROFILE_SIGN_OUT action')
      return { ...state, email: action.payload}
    default:
      return state
  }
}

export default profileReducer