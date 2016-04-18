import {
  CREATE_INVENTORY,
  DELETE_INVENTORY,
  FETCH_INVENTORY,
  LOGIN, CREATE_USER,
  CREATE_ORG,
  FETCH_DONOR_INVENTORY
} from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case CREATE_ORG:
      return [...state, action.payload.data];
    case CREATE_USER:
      return [...state, action.payload.data];
    case CREATE_INVENTORY:
      return [...state, action.payload.data];
    case DELETE_INVENTORY:
      return state.filter(item => item.id !== action.payload.data.id);
    case FETCH_INVENTORY:
      return [...state, ...action.payload.data];
    case FETCH_DONOR_INVENTORY:
      return [...state, ...action.payload.data];
    case LOGIN:
      return [...state, action.payload.data];
    default:
      return state;
  }
}
