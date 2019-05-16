import { SHOW_ADD_PLACE_MODAL, HIDE_ADD_PLACE_MODAL } from '../actions/types';

const INITIAL_STATE = {
  visible: false
};

const modalVisibilityReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SHOW_ADD_PLACE_MODAL:
      return {
        ...state,
        visible: payload
      };
    case HIDE_ADD_PLACE_MODAL:
      return {
        ...state,
        visible: payload
      };
    default:
      return state;
  }
};

export default modalVisibilityReducer;
