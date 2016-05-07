import {
  CHANGE_AUTH,
  SET_ROLE,
  AUTH_ERROR,
  AUTH_USER,
  UNAUTH_USER
} from '../actions';

const initialState = {
  authenticated: !!window.localStorage.getItem('token'),
  role: 'donor',
  token: window.localStorage.getItem('token')
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_AUTH:
      return { ...state, ...action.payload };
    case AUTH_USER:
      return {
        ...state,
        error: '',
        authenticated: true,
        token: action.payload.token,
        role: action.payload.role,
        username: action.payload.username
      };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case SET_ROLE:
      return { ...state, role: action.payload };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
