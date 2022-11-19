import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import "../src/components/App.css";
import App from "../src/components/App"
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import { default as rootReducer } from "../src/store/rootReducer"
import "./index.css"

const store = configureStore({
  reducer: rootReducer
});

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();