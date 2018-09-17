/**
 * @Author: JoseMunoz
 * @Date:   2018-07-16T12:35:34-06:00
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-09-15T17:24:16-06:00
 */
import React from 'react';
import { render } from 'react-dom';
import Component from '../../dist';

const App = () => (
  <Component
    style={{
      height: '32rem',
      display: 'flex',
      flexDirection: 'row',
      borderRadius: '1rem',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <h1
      style={{
        color: 'white',
        fontWeight: 400,
        fontSize: '40px',
        margin: '2rem auto',
        fontFamily: 'Helvetica',
      }}
    >
      React Gradient Container
    </h1>
  </Component>
);

render(<App />, document.getElementById('root'));
