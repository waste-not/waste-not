import { combineReducers } from 'redux';
import inventoryReducer from './reducer_inventory';

import authReducer from './reducer_authentication';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  form: formReducer,
  auth: authReducer
});

export default rootReducer;
