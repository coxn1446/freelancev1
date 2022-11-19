import { combineReducers } from 'redux';
import {twitterReducer} from './twitter/twitter.reducer';
import {registerReducer} from './register/register.reducer';


export default combineReducers({
  twttier: twitterReducer,
  register: registerReducer
});