import {
  VALIDATE_USER_FIELDS,
  VALIDATE_USER_FIELDS_SUCCESS,
  VALIDATE_USER_FIELDS_FAILURE,
  RESET_VALIDATE_USER_FIELDS
} from '../actions/validate_user_fields';

const INITIAL_STATE = {
  error: null,
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    // sign up or sign in form fields
    case VALIDATE_USER_FIELDS:
      return { ...state, error: null, loading: true };
    case VALIDATE_USER_FIELDS_SUCCESS:
      return { ...state, error: null, loading: false };
    case VALIDATE_USER_FIELDS_FAILURE:
      error = action.payload.data
      ? action.payload.data : { message: action.payload.msg };
      return { ...state, error: error, loading: false };
    case RESET_VALIDATE_USER_FIELDS:
      return { ...state, error: null, loading: false };
    default:
      return state;
  }
}
