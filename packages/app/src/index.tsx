import React from "react";
import ReactDOM from "react-dom";

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { createStore, applyMiddleware, Middleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './reducers/index';
import { saga } from './sagas/index';

import { ReduxState } from './reduxState/index';

import App from "./App";
import "./index.css";

// ---

const theme = createMuiTheme();

const reduxLoggingMiddleware: Middleware<{}, ReduxState> = store => next => action => {
    console.log('Redux logging middleware, logging action.');
    console.log(action);
    next(action);
    console.log('Redux logging middleware, logging state after action.');
    console.log(store.getState());
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    compose(
        applyMiddleware(sagaMiddleware),
        applyMiddleware(reduxLoggingMiddleware),
    ),
);

// @todo: To remove this once debug is over. Provide other debug access to store.
// @ts-ignore
window.store = store;

sagaMiddleware.run(saga);

// ---

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
