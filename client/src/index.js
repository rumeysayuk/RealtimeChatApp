import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles/common.css"
import "./styles/chatroom.css"
import "./Toaster";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from "./store/reducers"
import {Provider} from "react-redux";
import {devToolsEnhancer} from "redux-devtools-extension";


const store = createStore(reducers, compose(applyMiddleware(thunk), devToolsEnhancer()))

ReactDOM.render(<Provider store={store}> <App/></Provider>, document.getElementById('root'));

