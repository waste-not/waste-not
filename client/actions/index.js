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

const ROOT_URL = 'http://localhost:3000/api';

const getAxiosConfig = () => {
  const token = window.localStorage.getItem('token');
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
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, newOrg)
      .then(response => {
        dispatch( { type: AUTH_USER } );
        hashHistory.push(`/${newOrg.role}`);
        localStorage.setItem('token', response.data.token);
      })
      .catch(response => {
        dispatch(authError(response.data.error));
      });
  };
}

export function createInventory(newInventory) {

  const request =
    axios.post(`${ROOT_URL}/inventory`, newInventory, getAxiosConfig());

  return {
    type: CREATE_INVENTORY,
    payload: request
  };
}

export function fetchInventory() {
  const request = axios.get(`${ROOT_URL}/inventory`);

  return {
    type: FETCH_INVENTORY,
    payload: request
  };
}

export function fetchClaimedInventory() {
  const request = axios.get(`${ROOT_URL}/inventory/claimed`, getAxiosConfig());

  return {
    type: FETCH_CLAIMED,
    payload: request
  };
}

export function fetchDonorInventory() {
  const request = axios.get(`${ROOT_URL}/inventory/history`, getAxiosConfig());

  return {
    type: FETCH_DONOR_INVENTORY,
    payload: request
  };
}

export function deleteInventory(id) {
  const request = axios.delete(`${ROOT_URL}/inventory/${id}`, getAxiosConfig());

  return {
    type: DELETE_INVENTORY,
    payload: request
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

export function login(user) {
  const basic = window.btoa(`${user.username}:${user.password}`);
  return function(dispatch) {
    axios.get(`${ROOT_URL}/signin`, {
      headers: {
        'Authorization': `Basic ${basic}`
      }
    })
      .then(response => {
        dispatch( { type: AUTH_USER } );
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
