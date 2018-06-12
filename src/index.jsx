/*
* @Author: JoseMunoz
* @Date:   2018-06-10 19:07:35
* @Last Modified by:   JoseMunoz
* @Last Modified time: 2018-06-10 22:34:52
*/
import React from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import GradientContainer, { reducer, sagas } from './ReactGradientContainer';

const sagaMiddleware = createSagaMiddleware();

const middleware = process.env.NODE_ENV === 'production' ?
  applyMiddleware(sagaMiddleware) :
  composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = createStore(reducer, middleware);

sagaMiddleware.run(sagas);

const ConnectedContainer = props => (
  <Provider store={store}>
    <GradientContainer {...props} />
  </Provider>
);

export default ConnectedContainer;
