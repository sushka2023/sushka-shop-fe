import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store/index.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter, RouterProvider} from "react-router-dom";

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>
    
    
  </React.StrictMode>
);
