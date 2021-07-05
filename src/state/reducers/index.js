import { combineReducers } from "redux";
import registration from './registration';

const reducers = combineReducers({
    registration: registration,
})

export default reducers; 