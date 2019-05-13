import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import currentUserReducer from './current_user_reducer';
import modalVisibilityReducer from './modal_visibility_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  currentUser: currentUserReducer,
  modalVisibility: modalVisibilityReducer
});

export default rootReducer;
