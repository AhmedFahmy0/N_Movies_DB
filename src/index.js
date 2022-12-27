import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "animate.css/animate.min.css";
import './index.css';
import '../src/Components/Home/Home.css'
import './media_index.css'
import ApiDataProvider from "./Context/ApiStore";
import ListContextProvider from "./Context/ListContext";
import $ from 'jquery'


$(window).blur(function() {
  document.title = 'We Miss You ❤️';
})

$(window).focus(function() {
  document.title = 'D Movies';
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApiDataProvider>
      <ListContextProvider>
        <App />
      </ListContextProvider>
    </ApiDataProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
