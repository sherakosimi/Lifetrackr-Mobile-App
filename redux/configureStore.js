import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { usersReducers } from "./reducers/users";
import { counterReducer } from "./reducers/counter";
import { companionsReducer } from "./reducers/companions";
import { watcherSaga } from "./sagas/rootSaga";

const reducer = combineReducers({
  counter: counterReducer,
  users: usersReducers,
  companions: companionsReducer,
});
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga);

export default store;
