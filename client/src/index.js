import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './jsx/routes';
import './css/index.css';
// import App from './App';
import * as serviceWorker from './jsx/serviceWorker';


ReactDOM.render(
    <Router title={"Test"}>
        <Routes />
    </Router>,
    document.getElementById('root'),
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
