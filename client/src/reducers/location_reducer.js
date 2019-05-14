import { NAVIGATE_TO_SELECTED_PLACE } from '../actions/types';

const INITIAL_STATE  = {
  latitude: '',
  longitude: ''
};

const locationReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case NAVIGATE_TO_SELECTED_PLACE:
      const [ latitude, longitude ] = payload;
      return {
        ...state,
        latitude,
        longitude
      };
    default:
      return state;
  }
};

export default locationReducer;
