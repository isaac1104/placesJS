import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import currentUserReducer from './current_user_reducer';
import savedPlacesReducer from './saved_places_reducer';
import modalVisibilityReducer from './modal_visibility_reducer';
import sidebarVisibilityReducer from './sidebar_visibility_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  currentUser: currentUserReducer,
  savedPlaces: savedPlacesReducer,
  modalVisibility: modalVisibilityReducer,
  sidebarVisibility: sidebarVisibilityReducer
});

export default rootReducer;
