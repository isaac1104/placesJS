import { SHOW_MODAL, HIDE_MODAL } from '../actions/types';

const INITIAL_STATE = {
  visible: false
};

const modalVisibilityReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SHOW_MODAL:
      return {
        ...state,
        visible: payload
      };
    case HIDE_MODAL:
      return {
        ...state,
        visible: payload
      };
    default:
      return state;
  }
};

export default modalVisibilityReducer;
