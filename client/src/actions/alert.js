import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();      //allows us to get a random universal I.D.
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
  
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
