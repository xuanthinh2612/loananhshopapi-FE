import { combineReducers } from 'redux';

import studentReducer from './studentReducer';
import classReducer from './classReducer';

export default combineReducers({
    studentReducer,
    classReducer,
});
