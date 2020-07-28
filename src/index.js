import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { CookiesProvider } from 'react-cookie';



ReactDOM.render(
  <React.StrictMode>
  
  
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>
  
  
  </React.StrictMode>,
  document.getElementById('root')
);
