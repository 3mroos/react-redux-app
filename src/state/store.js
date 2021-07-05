import { createStore } from 'redux';
import reducres from "./reducers/index"

export const store = createStore(
    reducres, {}
)