import axios from 'axios';

export const CHANGE_AUTH = 'change_auth';
export const SET_ROLE = 'set_role';
export const CREATE_USER = 'create_user';
export const LOGIN = 'login';
export const FETCH_INVENTORY = 'fetch_inventory';
export const CREATE_INVENTORY = 'create_inventory';
export const DELETE_INVENTORY = 'delete_inventory';

const ROOT_URL = 'https://localhost:3000/api';

// Will be used as higher order component
export function authenticate(isLoggedIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  };
}

export function createUser(newUser) {
  const request = axios.post(`${ROOT_URL}/signup`, newUser);

  return  {
    type: CREATE_USER,
    payload: request
  };
}

export function createOrg(newOrg) {
  const request = axios.post(`${ROOT_URL}/signup`, newOrg);

  return  {
    type: CREATE_ORG,
    payload: request
  };
}

export function createInventory(newInventory) {
  const request = axios.post(`${ROOT_URL}/inventory`, newInventory);

  return  {
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

export function deleteInventory(id) {
  const request = axios.delete(`${ROOT_URL}/inventory/${id}`);

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

export function login(user) {
  const request = axios.get(`${ROOT_URL}/signin`, user);

  return {
    type: LOGIN,
    payload: request
  };
}
