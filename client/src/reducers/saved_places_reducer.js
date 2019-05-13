import { FETCH_SAVED_PLACES_REQUEST, FETCH_SAVED_PLACES_SUCCESS, FETCH_SAVED_PLACES_FAIL } from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  data: [],
  errorMsg: null
};

const savedPlacesReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FETCH_SAVED_PLACES_REQUEST:
      return {
        ...state,
        isFetching: payload,
        data: [],
        errorMsg: null
      };
    case FETCH_SAVED_PLACES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: payload,
        errorMsg: null
      };
    case FETCH_SAVED_PLACES_FAIL:
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

export default savedPlacesReducer;
