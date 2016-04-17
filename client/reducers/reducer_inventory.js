import { CREATE_INVENTORY, DELETE_INVENTORY } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case CREATE_INVENTORY:
      return [...state, action.payload.data];
    case DELETE_INVENTORY:
      return state.filter(item => item.id != action.payload.data.id);
    default:
      return state;
  }
}
