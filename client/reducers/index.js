import { combineReducers } from 'redux';
import inventoryReducer from './reducer_inventory';

import authReducer from './reducer_authentication';
import validateUserFieldsReducer from './reducer_validation';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  validateFields: validateUserFieldsReducer,
  form: formReducer,
  auth: authReducer
});

export default rootReducer;
