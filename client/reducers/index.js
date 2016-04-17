import { combineReducers } from 'redux';
import inventoryReducer from './reducer_inventory';
import authenticationReducer from './reducer_authentication';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  authenticated: authenticationReducer,
  form: formReducer
});

export default rootReducer;
