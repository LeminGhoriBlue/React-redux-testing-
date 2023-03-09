import { createStore, applyMiddleware } from "redux";
import reducers from "./Reduser/index"
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const Store = createStore(reducers, composeWithDevTools(
    applyMiddleware(logger, thunk),
));
export default Store;