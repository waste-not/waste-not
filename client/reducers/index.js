import { combineReducers } from 'redux';
import inventoryReducer from './reducer_inventory';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  form: formReducer
});

export default rootReducer;
