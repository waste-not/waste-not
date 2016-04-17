import {
  CHANGE_AUTH,
  SET_ROLE
} from '../actions';

const initialState = {
  authenticated: !!window.localStorage.getItem('token'),
  role: 'donor',
  token: window.localStorage.getItem('token')
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_AUTH:
      return { ...state, ...action.payload };
    case SET_ROLE:
      return { ...state, role: action.payload };
    default:
      return state;
  }

  return state;
}
