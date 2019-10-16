import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import detailsReducer from './detailReducer';

const rootReducer = combineReducers({
  search: searchReducer,
  details: detailsReducer
})

export default rootReducer;