import axios from 'axios';
import * as types from './types';

export const fetchCurrentUserData = () => async dispatch => {
  dispatch({ type: types.FETCH_CURRENT_USER_REQUEST, payload: true });
  try {
    const request = await axios.get('/api/current_user');
    const { data } = request;
    dispatch({ type: types.FETCH_CURRENT_USER_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: types.FETCH_CURRENT_USER_FAIL, payload: e });
  }
};
