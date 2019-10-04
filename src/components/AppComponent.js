import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Layout from "./layout/Layout";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configStore from "./../redux/store";

const { store, persistor } = configStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HashRouter>
            <Switch>
              <Route path="/" name="Home" component={Layout} />
            </Switch>
          </HashRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
