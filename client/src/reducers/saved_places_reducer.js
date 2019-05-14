import {
  FETCH_SAVED_PLACES_REQUEST,
  FETCH_SAVED_PLACES_SUCCESS,
  FETCH_SAVED_PLACES_FAIL,
  SAVE_SELECTED_PLACE,
  DELETE_SELECTED_PLACE
} from '../actions/types';

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
    case SAVE_SELECTED_PLACE:
    const { title, description, latitude, longitude, uuid } = payload;
      return {
        ...state,
        isFetching: false,
        data: [
          ...state.data,
          { title, description, latitude, longitude, uuid  }
        ],
        errorMsg: null
      };
    case DELETE_SELECTED_PLACE:
      return {
        ...state,
        isFetching: false,
        data: state.data.filter(place => place.uuid !== payload),
        errorMsg: null
      };
    default:
      return state;
  }
};

export default savedPlacesReducer;
