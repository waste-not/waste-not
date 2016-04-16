import axios from 'axios';

export const SET_ROLE = 'set_role';
export const CREATE_USER = 'create_user';
export const LOGIN = 'login';
export const CREATE_INVENTORY = 'create_inventory';
export const DELETE_INVENTORY = 'delete_inventory';

const ROOT_URL = 'localhost:3000/api';

export function createUser(newUser) {
  const request = axios.post(`${ROOT_URL}/users`, newUser);

  return  {
    type: CREATE_USER,
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

// export function login(user) {
//   const request = axios.post(`${ROOT_URL}/users`, )
// }
