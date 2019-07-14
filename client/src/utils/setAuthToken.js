import axios from 'axios';

//adding global header
//if we had a token, we will send it with every request instead of picking and choosing which request to sent it with
const setAuthToken = token => {
  if (token) {                              //if there is a token in the localstorage
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;