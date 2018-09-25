/**
 * @Author: JoseMunoz
 * @Date:   2018-07-16T12:35:34-06:00
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-09-15T17:24:16-06:00
 */
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import Gradient from '../../dist';

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'space-evenly',
};

const baseStyles = {
  flexGrow: 1,
  width: '30vw',
  height: '30vw',
  display: 'flex',
  minWidth: '33vh',
  minHeight: '33vh',
  margin: '0.25rem',
  flexBasis: 'content',
  borderRadius: '1rem',
  alignItems: 'center',
  boxShadow: ' 0 2px 3px rgba(0,0,0, 0.1)',
};

const textStyle = {
  color: 'white',
  fontWeight: 100,
  fontSize: '40px',
  margin: '2rem auto',
  textDecoration: 'none',
  fontFamily: 'Helvetica',
};

const Link = ({ children, ...props }) => (
  <a
    style={textStyle}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
);

const App = () => (
  <Fragment>
    <div style={containerStyle}>
      <Gradient
        style={baseStyles}
        orientation="right"
      >
        <Link
          href="https://github.com/jdmg94/react-gradient-container"
        >
          Github Repo
        </Link>
      </Gradient>
      <Gradient
        style={baseStyles}
        orientation={-75}
        colors={[
          [232, 232, 232],
          [252, 129, 74],
          [191, 191, 191],
          [150, 147, 155],
          [86, 66, 86],
        ]}
      >
        <Link
          href="https://github.com/jdmg94/react-gradient-container/blob/master/examples/src/index.jsx"
        >
          How to Use
        </Link>
      </Gradient>
      <Gradient
        style={baseStyles}
        orientation="top"
        colors={[
          [229, 61, 0],
          [255, 233, 0],
          [252, 255, 247],
          [33, 160, 160],
          [4, 104, 101],
        ]}
      >
        <Link
          href="https://superiortech.co"
        >
          Superior Tech
        </Link>
      </Gradient>
    </div>
    <div style={containerStyle}>
      <h1
        style={{
          ...textStyle,
          color: 'black',
          margin: '4rem',
          fontWeight: 600,
        }}
      >
        React Gradient Container
      </h1>
    </div>
    <div style={containerStyle}>
      <Gradient
        style={{
          ...baseStyles,
          borderRadius: '16rem 1rem',
        }}
        orientation={['top', 'right']}
        colors={[
          'FF9F1C',
          'FFBF69',
          'FFFFFF',
          'CBF3F0',
          '2EC4B6',
        ]}
      >
        <p style={textStyle}>
        All Shapes
        </p>
      </Gradient>
      <Gradient
        style={baseStyles}
        colors={[
          '#2B4141',
          '#0EB1D2',
          '#34E4EA',
          '#8AB9B5',
          '#C8C2AE',
        ]}
      >
        <p style={textStyle}>
        And Sizes
        </p>
      </Gradient>
    </div>
  </Fragment>
);

render(<App />, document.getElementById('root'));
