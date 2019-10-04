import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";

const config = {
  key: "root",
  whiteList: ['user'],
  storage
};

const persistedReducer = persistReducer(config, rootReducer);

const middleware = [];
middleware.push(thunk);

const enhancers = [applyMiddleware(...middleware)];

const composedEnhancers = composeWithDevTools(...enhancers);
const store = createStore(persistedReducer, {}, composedEnhancers);

export default () => {
  let persistor = persistStore(store);
  return { store, persistor };
};
