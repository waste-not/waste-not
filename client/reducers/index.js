import { combineReducers } from 'redux';
import inventoryReducer from './reducer_inventory';

const rootReducer = combineReducers({
  inventory: inventoryReducer
});

export default rootReducer;
