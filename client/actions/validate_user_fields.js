import axios from 'axios';

// Validate user fields like name and password
export const VALIDATE_USER_FIELDS = 'VALIDATE_USER_FIELDS';
export const VALIDATE_USER_FIELDS_SUCCESS = 'VALIDATE_USER_FIELDS_SUCCESS';
export const VALIDATE_USER_FIELDS_FAILURE = 'VALIDATE_USER_FIELDS_FAILURE';
export const RESET_VALIDATE_USER_FIELDS = 'RESET_VALIDATE_USER_FIELDS';

const ROOT_URL = 'http://localhost:3000/api';

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

export function validateUserFields(values, resolve, reject) {
  return dispatch => {
    axios.post(`${ROOT_URL}/validate/user`, values)
      .then(response => {
        dispatch(validateUserFieldsSuccess(response.data));
        resolve();
      })
      .catch(err => {
        dispatch(validateUserFieldsFailure(err.data));
        reject({ username: err.data.msg });
      });
  };
}
