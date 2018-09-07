import {combineReducers} from 'redux';
import tasks from './Tasks';

const allReducers=combineReducers({
	tasks
});

export default allReducers;