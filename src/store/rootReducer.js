import { combineReducers } from 'redux';
import {registerReducer} from './register/register.reducer';
import {homeReducer} from './home/home.reducer';


export default combineReducers({
  register: registerReducer,
  home: homeReducer
});