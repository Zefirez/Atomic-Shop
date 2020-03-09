import React from 'react';
//router imports
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
//redux imports
import { Provider } from 'react-redux'
import store from './redux/store'
//standard imports
import './index.css';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));