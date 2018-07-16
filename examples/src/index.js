/**
 * @Author: JoseMunoz
 * @Date:   2018-07-16T12:35:34-06:00
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-07-16T13:28:16-06:00
 */
import React from 'react';
import { render } from 'react-dom';
import Component from '../../src';

const App = () => (
  <Component
    style={{
      display: 'block',
      textAlign: 'center',
      borderRadius: '1rem',
    }}
  >
    <h1
      style={{
        color: 'white',
        fontWeight: 400,
        margin: '2rem auto',
        fontFamily: 'Helvetica',
      }}
    >
      React Gradient Container
    </h1>
  </Component>
);

render(<App />, document.getElementById('root'));
