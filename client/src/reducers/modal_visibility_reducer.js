import { TOGGLE_ADD_PLACE_MODAL, TOGGLE_SELECTED_PLACE_MODAL } from '../actions/types';

const INITIAL_STATE = {
  addPlaceModalVisible: false,
  selectedPlaceModalVisible: false
};

const modalVisibilityReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_ADD_PLACE_MODAL:
      return {
        ...state,
        addPlaceModalVisible: !state.addPlaceModalVisible
      };
    case TOGGLE_SELECTED_PLACE_MODAL:
      return {
        ...state,
        selectedPlaceModalVisible: !state.selectedPlaceModalVisible
      };
    default:
      return state;
  }
};

export default modalVisibilityReducer;
