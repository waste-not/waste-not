import {
  CREATE_INVENTORY,
  DELETE_INVENTORY,
  FETCH_INVENTORY,
  FETCH_ACTIVE,
  FETCH_CLAIMED,
  FETCH_DONOR_INVENTORY,
  CLAIM_INVENTORY,
  UNCLAIM_INVENTORY,
  FETCH_ACTIVE_MAP_MARKER,
  CLICK_MAP_MARKER,
  CLOSE_MAP_MARKER,
  TOGGLE_MAP_ON,
  TOGGLE_MAP_OFF
} from '../actions';

const initialState = {
  inventory: [],
  claimedInventory: [],
  donorInventory: [],
  activeInventory: [],
  activeMarkerInventory: [],
  showInfo: false,
  showMap: false
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
    case FETCH_ACTIVE_MAP_MARKER:
      return {
        ...state,
        activeMarkerInventory: action.payload.map(marker => marker.coordinates)
      };
    case CLAIM_INVENTORY:
      return {
        ...state,
        activeInventory: state.activeInventory
          .filter(item => item._id !== action.payload.item._id),
        claimedInventory: [
          ...state.claimedInventory,
          { ...action.payload.item, claimedBy: action.payload.userId }
        ]
      };
    case UNCLAIM_INVENTORY:
      return {
        ...state,
        activeInventory: [
          ...state.activeInventory,
          { ...action.payload, claimedBy: '' }
        ],
        claimedInventory: state.claimedInventory
          .filter(item => item._id !== action.payload._id)
      };
    case CLICK_MAP_MARKER:
      console.log(state.showInfo);
      return {
        ...state,
        showInfo: true
      };
    case CLOSE_MAP_MARKER:
      console.log(action.payload);
      return {
        ...state,
        showInfo: false
      };
    case TOGGLE_MAP_ON:
      return {
        ...state,
        showMap: true
      };
    case TOGGLE_MAP_OFF:
      return {
        ...state,
        showMap: false
      };
    default:
      return state;
  }
}
