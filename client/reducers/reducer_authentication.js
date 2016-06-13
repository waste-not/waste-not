import {
  SET_ROLE,
  AUTH_ERROR,
  AUTH_USER,
  UNAUTH_USER
} from '../actions';

const initialState = {
  authenticated: !!window.localStorage.getItem('token'),
  role: localStorage.getItem('role'),
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
  _id: localStorage.getItem('_id'),
  error: ''
};

const blankState = {
  authenticated: false,
  role: '',
  token: '',
  username: '',
  _id: '',
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        ...action.payload,
        error: '',
        authenticated: true
      };
    case UNAUTH_USER:
      return { ...blankState };
    case SET_ROLE:
      return { ...state, role: action.payload };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
