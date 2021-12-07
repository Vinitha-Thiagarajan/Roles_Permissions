import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import createStore from './store'

const storeParams = createStore();
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={storeParams.store} >
    <PersistGate loading={null} persistor={storeParams.persistor}>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>,
    </PersistGate>
  </Provider>,
  rootElement
);
