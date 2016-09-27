import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { imageReducer } from './reducer'
import { fetchImages } from './action'

import App from './app'

var store = createStore(imageReducer, compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.subscribe(function() {
    console.log(store.getState())
});


var contentBox = document.getElementById("contentBox");
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, contentBox 
);
