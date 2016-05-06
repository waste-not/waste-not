import axios from 'axios';
import { hashHistory } from 'react-router';

export const CHANGE_AUTH = 'change_auth';
export const SET_ROLE = 'set_role';
export const CREATE_USER = 'create_user';
export const LOGIN = 'login';
export const FETCH_INVENTORY = 'fetch_inventory';
export const FETCH_DONOR_INVENTORY = 'fetch_donor_inventory';
export const FETCH_CLAIMED = 'fetch_claimed';
export const CREATE_INVENTORY = 'create_inventory';
export const DELETE_INVENTORY = 'delete_inventory';
export const CREATE_ORG = 'create_org';
export const AUTH_ERROR = 'auth_error';
export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const INVENTORY_ERROR = 'inventory_error';

const ROOT_URL = 'http://localhost:3000/api';

const getAxiosConfig = () => {
  const token = localStorage.getItem('token');
  return token ? { headers: { 'Token': token } } : null;
};

export function createUser(newUser) {
  const request = axios.post(`${ROOT_URL}/signup`, newUser);

  return {
    type: CREATE_USER,
    payload: request
  };
}

export function createOrg(newOrg) {
  return dispatch => {
    axios.post(`${ROOT_URL}/signup`, newOrg)
      .then(response => {
        dispatch(authUser(response.data));
        hashHistory.push(`/${newOrg.role}`);
        localStorage.setItem('token', response.data.token);
      })
      .catch((response) => {
        console.log(response);
        dispatch(authError('Signup failed'));
      });
  };
}

export function inventoryError(error) {
  return {
    type: INVENTORY_ERROR,
    payload: error
  };
}

export function createInventory(newInventory) {
  return dispatch => {
    axios.post(`${ROOT_URL}/inventory`, newInventory, getAxiosConfig())
      .then(response => {
        dispatch({ type: CREATE_INVENTORY, payload: response.data });
      })
      .catch(() => {
        dispatch(inventoryError('Could not create inventory'));
      });
  };
}

export function fetchInventory() {
  return dispatch => {
    axios.get(`${ROOT_URL}/inventory`)
      .then(response => {
        dispatch({ type: FETCH_INVENTORY, payload: response.data });
      })
      .catch(() => {
        dispatch(inventoryError('Could not fetch inventory'));
      });
  };
}

export function fetchClaimedInventory() {
  return dispatch => {
    axios.get(`${ROOT_URL}/inventory/claimed`, getAxiosConfig())
      .then(response => {
        dispatch({ type: FETCH_CLAIMED, payload: response.data });
      })
      .catch(() => {
        dispatch(inventoryError('Could not fetch claimed inventory'));
      });
  };
}

export function fetchDonorInventory() {
  return dispatch => {
    axios.get(`${ROOT_URL}/inventory/history`, getAxiosConfig())
      .then(response => {
        dispatch({ type: FETCH_DONOR_INVENTORY, payload: response.data });
      })
      .catch(() => {
        dispatch(inventoryError('Could not fetch donor inventory'));
      });
  };
}

export function deleteInventory(id) {
  return dispatch => {
    axios.delete(`${ROOT_URL}/inventory/${id}`, getAxiosConfig())
      .then(response => {
        dispatch({ type: DELETE_INVENTORY, payload: response.data });
      })
      .catch(() => {
        dispatch(inventoryError('Could not delete item'));
      });
  };
}

export function setRole(role) {
  return {
    type: SET_ROLE,
    payload: role
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function authUser(data) {
  const { token, role } = data;
  return {
    type: AUTH_USER,
    payload: { token, role }
  };
}

export function login(user) {
  const basic = window.btoa(`${user.username}:${user.password}`);
  return dispatch => {
    axios.get(`${ROOT_URL}/signin`, {
      headers: {
        'Authorization': `Basic ${basic}`
      }
    })
      .then(response => {
        console.log(response);
        dispatch(authUser(response.data));
        hashHistory.push(`${response.data.role}`);
        localStorage.setItem('token', response.data.token);
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  };
}
