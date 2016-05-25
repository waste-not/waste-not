import axios from 'axios';
import { hashHistory } from 'react-router';

export const SET_ROLE = 'set_role';
export const CREATE_USER = 'create_user';
export const LOGIN = 'login';
export const FETCH_INVENTORY = 'fetch_inventory';
export const FETCH_ACTIVE = 'fetch_active';
export const FETCH_DONOR_INVENTORY = 'fetch_donor_inventory';
export const FETCH_CLAIMED = 'fetch_claimed';
export const CLAIM_INVENTORY = 'claim_inventory';
export const UNCLAIM_INVENTORY = 'unclaim_inventory';
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

const storeUser = ({ token, role, _id, username }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
  localStorage.setItem('_id', _id);
  localStorage.setItem('username', username);
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
        storeUser({
          token: response.data.token,
          role: newOrg.role,
          _id: response.data._id,
          username: newOrg.username
        });
        hashHistory.push(`/${newOrg.role}`);
      })
      .catch(response => {
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
        hashHistory.push('/donor');
      })
      .catch(err => {
        console.log(err);
        dispatch(inventoryError('Could not create inventory'));
      });
  };
}

export function claimInventory(item, userId) {
  return dispatch => {
    axios.put(`${ROOT_URL}/inventory/claim/${item._id}`, null, getAxiosConfig())
      .then(() => {
        dispatch({ type: CLAIM_INVENTORY, payload: { item, userId } });
      })
      .catch(err => {
        console.log(err);
        dispatch(inventoryError('Could not claim inventory'));
      });
  };
}

export function unclaimInventory(item) {
  return dispatch => {
    axios
      .put(`${ROOT_URL}/inventory/unclaim/${item._id}`, null, getAxiosConfig())
      .then(() => {
        dispatch({ type: UNCLAIM_INVENTORY, payload: item });
      })
      .catch(err => {
        console.log(err);
        dispatch(inventoryError('Could not unclaim inventory'));
      });
  };
}

export function fetchInventory() {
  return dispatch => {
    axios.get(`${ROOT_URL}/inventory`)
      .then(response => {
        dispatch({ type: FETCH_INVENTORY, payload: response.data });
      })
      .catch(err => {
        console.log(err);
        dispatch(inventoryError('Could not fetch inventory'));
      });
  };
}

export function fetchActiveInventory() {
  return dispatch => {
    axios.get(`${ROOT_URL}/inventory/active`)
      .then(response => {
        dispatch({ type: FETCH_ACTIVE, payload: response.data });
      })
      .catch(err => {
        console.log(err);
        dispatch(inventoryError('Could not fetch active inventory'));
      });
  };
}

export function fetchClaimedInventory() {
  return dispatch => {
    axios.get(`${ROOT_URL}/inventory/claimed`, getAxiosConfig())
      .then(response => {
        dispatch({ type: FETCH_CLAIMED, payload: response.data });
      })
      .catch(err => {
        console.log(err);
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
      .catch(err => {
        console.log(err);
        dispatch(inventoryError('Could not fetch donor inventory'));
      });
  };
}

export function deleteInventory(id) {
  return dispatch => {
    axios.delete(`${ROOT_URL}/inventory/${id}`, getAxiosConfig())
      .then(() => {
        dispatch({ type: DELETE_INVENTORY, payload: id });
      })
      .catch(err => {
        console.log(err);
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
  const { token, role, username } = data;
  return {
    type: AUTH_USER,
    payload: { token, role, username }
  };
}

export function login(user, resolve, reject) {
  const basic = window.btoa(`${user.username}:${user.password}`);
  return dispatch => {
    axios.get(`${ROOT_URL}/signin`, {
      headers: {
        'Authorization': `Basic ${basic}`
      }
    })
      .then(response => {
        dispatch(authUser(response.data));
        const { token, role, _id, username } = response.data;
        storeUser({ token, role, _id, username });
        hashHistory.push(`${role}`);
        resolve();
      })
      .catch(err => {
        console.log(err);
        dispatch(authError(err));
        reject({ _error: err.data.msg });
      });
  };
}

export function signoutUser() {
  // this removes all localStorage.
  // if we ever start storing non-auth stuff in there this will be problematic
  localStorage.clear();

  return {
    type: UNAUTH_USER
  };
}
