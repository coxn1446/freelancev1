import { combineReducers } from 'redux';
import {registerReducer} from './register/register.reducer';
import {socialReducer} from './social/social.reducer';
import {blogReducer} from './blog/blog.reducer';


export default combineReducers({
  register: registerReducer,
  social: socialReducer,
  blog: blogReducer
});