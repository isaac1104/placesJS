import { SHOW_ADD_PLACE_MODAL, HIDE_ADD_PLACE_MODAL, SHOW_SELECTED_PLACE_MODAL, HIDE_SELECTED_PLACE_MODAL } from '../actions/types';

const INITIAL_STATE = {
  addPlaceModalVisible: false,
  selectedPlaceModalVisible: false
};

const modalVisibilityReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SHOW_ADD_PLACE_MODAL:
      return {
        ...state,
        addPlaceModalVisible: payload
      };
    case HIDE_ADD_PLACE_MODAL:
      return {
        ...state,
        addPlaceModalVisible: payload
      };
    case SHOW_SELECTED_PLACE_MODAL:
      return {
        ...state,
        selectedPlaceModalVisible: payload
      };
    case HIDE_SELECTED_PLACE_MODAL:
      return {
        ...state,
        selectedPlaceModalVisible: payload
      };
    default:
      return state;
  }
};

export default modalVisibilityReducer;
