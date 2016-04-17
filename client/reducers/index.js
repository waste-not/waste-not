import { combineReducers } from 'redux';
import inventoryReducer from './reducer_inventory';

import authReducer from './reducer_authentication';
>>>>>>> 9eda2cecb51f4a7ecb369a68750118d80adb45fa
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  form: formReducer,
  auth: authReducer
});

export default rootReducer;
