import Popup from "./Popup";
import React from 'react';
import ReactDOM from 'react-dom/client';
import store from "../store";
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Popup />
  </Provider>
  </React.StrictMode>
);
