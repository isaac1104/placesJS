import { SHOW_SIDEBAR, HIDE_SIDEBAR } from '../actions/types';

const INITIAL_STATE = {
  visible: false
};

const sidebarVisibilityReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SHOW_SIDEBAR:
      return {
        ...state,
        visible: payload
      };
    case HIDE_SIDEBAR:
      return {
        ...state,
        visible: payload
      };
    default:
      return state;
  }
};

export default sidebarVisibilityReducer;
