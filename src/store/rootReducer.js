import { combineReducers } from 'redux';
import {twitterReducer} from './twitter/twitter.reducer';


export default combineReducers({
  twttier: twitterReducer
});