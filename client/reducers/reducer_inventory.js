import {
  CREATE_INVENTORY,
  DELETE_INVENTORY,
  FETCH_INVENTORY,
  FETCH_CLAIMED,
  FETCH_DONOR_INVENTORY
} from '../actions';

const initialState = {
  inventory: [],
  claimedInventory: [],
  donorInventory: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_INVENTORY:
      return {
        ...state,
        inventory: [...state.inventory, action.payload]
      };
    case DELETE_INVENTORY:
      return {
        ...state,
        inventory: state.filter(item => item.id !== action.payload.id)
      };
    case FETCH_INVENTORY:
      return {
        ...state,
        inventory: action.payload
      };
    case FETCH_CLAIMED:
      return {
        ...state,
        claimedInventory: action.payload
      };
    case FETCH_DONOR_INVENTORY:
      return {
        ...state,
        donorInventory: action.payload
      };
    default:
      return state;
  }
}
