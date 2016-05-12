import axios from 'axios';

// Validate user fields like name and password
export const VALIDATE_USER_FIELDS = 'VALIDATE_USER_FIELDS';
export const VALIDATE_USER_FIELDS_SUCCESS = 'VALIDATE_USER_FIELDS_SUCCESS';
export const VALIDATE_USER_FIELDS_FAILURE = 'VALIDATE_USER_FIELDS_FAILURE';
export const RESET_VALIDATE_USER_FIELDS = 'RESET_VALIDATE_USER_FIELDS';


const ROOT_URL = 'http://localhost:3000/api';

// This is a temp function used to compare
export function validateTempFields(values) {
  const request = axios.post(`${ROOT_URL}/validate/user`, values);

  return {
    type: VALIDATE_USER_FIELDS,
    payload: request
  };
}

export function validateUserFieldsSuccess() {
  return {
    type: VALIDATE_USER_FIELDS_SUCCESS
  };
}

export function validateUserFieldsFailure(error) {
  return {
    type: VALIDATE_USER_FIELDS_FAILURE,
    payload: error
  };
}

export function resetValidateUserFields() {
  return {
    type: RESET_VALIDATE_USER_FIELDS
  };
}

export function validateUserFields(values) {
  return dispatch => {
    axios.post(`${ROOT_URL}/validate/user`, values)
      .then(response => {
        console.log(response.status);
        dispatch(validateUserFieldsSuccess(response.data));
      })
      .catch(err => {
        console.log(err.data.msg);
        dispatch(validateUserFieldsFailure(err));
      });
  };
}
