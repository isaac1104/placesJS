import { TOGGLE_SIDEBAR } from '../actions/types';

const INITIAL_STATE = {
  visible: false
};

const sidebarVisibilityReducer = (state = INITIAL_STATE, { type }) => {
  switch (type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        visible: !state.visible
      };
    default:
      return state;
  }
};

export default sidebarVisibilityReducer;
