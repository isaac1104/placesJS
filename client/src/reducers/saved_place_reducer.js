import { FETCH_SAVED_PLACE_REQUEST, FETCH_SAVED_PLACE_SUCCESS, FETCH_SAVED_PLACE_FAIL } from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  data: [],
  errorMsg: null
};

const savedPlaceReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FETCH_SAVED_PLACE_REQUEST:
      return {
        ...state,
        isFetching: payload,
        data: [],
        errorMsg: null
      };
    case FETCH_SAVED_PLACE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: payload,
        errorMsg: null
      };
    case FETCH_SAVED_PLACE_FAIL:
      return {
        ...state,
        isFetching: false,
        data: [],
        errorMsg: payload
      };
    default:
      return state;
  }
};

export default savedPlaceReducer;
