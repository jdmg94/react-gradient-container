/*
* @Author: JoseMunoz
* @Date:   2018-06-10 09:58:30
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-09-15T15:20:43-06:00
*/
import React from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import GradientContainer, { sagas, reducer } from './GradientContainer';

const sagaMiddleware = createSagaMiddleware();

const middleware = process.env.NODE_ENV === 'production'
  ? applyMiddleware(sagaMiddleware)
  : composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = createStore(reducer, middleware);

sagaMiddleware.run(sagas);

const ConnectedContainer = props => (
  <Provider store={store}>
    <GradientContainer {...props} />
  </Provider>
);

export default ConnectedContainer;
