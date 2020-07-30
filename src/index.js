import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter} from "react-router-dom";


import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { CookiesProvider } from 'react-cookie';



ReactDOM.render(
  <React.StrictMode>
  
  <BrowserRouter>
  
  <CookiesProvider>
    <Provider store={store}>
    
      <Route path="/" component={App} /> 
      
    </Provider>
  </CookiesProvider>
  
  </BrowserRouter>
  
  </React.StrictMode>,
  document.getElementById('root')
);

// https://stackoverflow.com/questions/42010053/react-router-this-props-location