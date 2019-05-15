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

export const fetchSavedPlaces = () => async dispatch => {
  dispatch({ type: types.FETCH_SAVED_PLACES_REQUEST, payload: true });
  try {
    const request = await axios.get('/api/saved_places');
    const { data } = request;
    dispatch({ type: types.FETCH_SAVED_PLACES_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: types.FETCH_SAVED_PLACES_FAIL, payload: e });
  }
};

export const fetchSavedPlace = uuid => async dispatch => {
  dispatch({ type: types.FETCH_SAVED_PLACE_REQUEST, payload: true });
  try {
    const request = await axios.get(`/api/saved_places/${uuid}`);
    const { data } = request;
    dispatch({ type: types.FETCH_SAVED_PLACE_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: types.FETCH_SAVED_PLACE_FAIL, payload: e });
  }
};

export const saveSelectedPlace = value => async dispatch => {
  try {
    const request = await axios.post('/api/saved_places', value);
    const { data } = request;
    dispatch({ type: types.SAVE_SELECTED_PLACE, payload: data });
  } catch (e) {
    dispatch({ type: types.SAVE_SELECTED_PLACE, payload: e });
  }
};

export const deleteSelectedPlace = (uuid, displayMessage, hideSidebar) => async dispatch => {
  try {
    await axios.delete('/api/saved_places', {
      params: {
        uuid
      }
    });
    dispatch({ type: types.DELETE_SELECTED_PLACE, payload: uuid });
    hideSidebar();
    displayMessage();
  } catch (e) {
    dispatch({ type: types.DELETE_SELECTED_PLACE, payload: e });
  }
};

export const navigateToSelectedPlace = (location, callback) => dispatch => {
  dispatch({ type: types.NAVIGATE_TO_SELECTED_PLACE, payload: location });
  if (callback) {
    callback();
  }
};

export const showModal = () => ({
  type: types.SHOW_MODAL,
  payload: true
});

export const hideModal = () => ({
  type: types.HIDE_MODAL,
  payload: false
});

export const showSidebar = () => ({
  type: types.SHOW_SIDEBAR,
  payload: true
});

export const hideSidebar = () => ({
  type: types.HIDE_SIDEBAR,
  payload: false
});
