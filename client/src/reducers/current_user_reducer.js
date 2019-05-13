import { FETCH_CURRENT_USER_REQUEST, FETCH_CURRENT_USER_SUCCESS, FETCH_CURRENT_USER_FAIL } from '../actions/types';

const INITIAL_STATE = {
  data: '',
  isFetching: null,
  errorMsg: null
};

const currentUserReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FETCH_CURRENT_USER_REQUEST:
      return {
        ...state,
        data: '',
        isFetching: payload,
        errorMsg: null
      };
    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        data: payload,
        isFetching: false,
        errorMsg: null
      };
    case FETCH_CURRENT_USER_FAIL:
      return {
        ...state,
        data: [],
        isFetching: false,
        errorMsg: payload
      };
    default:
      return state;
  }
};

export default currentUserReducer;
