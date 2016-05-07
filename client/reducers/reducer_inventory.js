import {
  CREATE_INVENTORY,
  DELETE_INVENTORY,
  FETCH_INVENTORY,
  FETCH_ACTIVE,
  FETCH_CLAIMED,
  FETCH_DONOR_INVENTORY,
  CLAIM_INVENTORY,
  UNCLAIM_INVENTORY
} from '../actions';

const initialState = {
  inventory: [],
  claimedInventory: [],
  donorInventory: [],
  activeInventory: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_INVENTORY:
      return {
        ...state,
        donorInventory: [...state.donorInventory, action.payload]
      };
    case DELETE_INVENTORY:
      return {
        ...state,
        inventory: state.inventory.filter(item => item._id !== action.payload)
      };
    case FETCH_INVENTORY:
      return {
        ...state,
        inventory: action.payload
      };
    case FETCH_ACTIVE:
      return {
        ...state,
        activeInventory: action.payload
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
    case CLAIM_INVENTORY:
      return {
        ...state,
        activeInventory: state.activeInventory
          .filter(item => item._id !== action.payload._id),
        claimedInventory: [
          ...state.claimedInventory,
          { ...action.payload, claimedBy: true }
        ]
      };
    case UNCLAIM_INVENTORY:
      return {
        ...state,
        activeInventory: [
          ...state.activeInventory,
          { ...action.payload, claimedBy: false }
        ],
        claimedInventory: state.claimedInventory
          .filter(item => item._id !== action.payload._id)
      };
    default:
      return state;
  }
}
