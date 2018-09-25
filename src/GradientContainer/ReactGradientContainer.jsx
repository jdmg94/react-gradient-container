/*
* @Author: JoseMunoz
* @Date:   2018-06-10 10:01:27
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-09-15T18:13:51-06:00
*/
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import React, { Component } from 'react';
import * as actions from './ReactGradientContainer.ducks';

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

const mapStateToProps = state => ({
  end: state.end,
  start: state.start,
  gradientOrientation: state.gradientOrientation,
});

class GradientContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: null,
    };
  }

  componentDidMount() {
    const {
      colors,
      setColors,
      changeColor,
      orientation,
      setOrientation,
    } = this.props;

    setColors(colors);
    setOrientation(orientation);

    const task = setInterval(changeColor, 250);

    this.setState({ task });
  }

  componentWillUnmount() {
    const { task } = this.state;

    clearInterval(task);
  }

  render() {
    const {
      end,
      start,
      style,
      children,
      className,
      gradientOrientation,
    } = this.props;

    const passedProps = {
      style,
      children,
      className,
    };

    const GradientBackground = styled.div`
      overflow: hidden;
      padding: 0.25rem;
      margin: 0.5rem 1.5rem;
      trantision: background 0.25s;
      background: linear-gradient(${gradientOrientation}, #${start}, #${end});
    `;

    return <GradientBackground {...passedProps} />;
  }
}

const orientations = [
  'top',
  'left',
  'right',
  'bottom',
];

GradientContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  setColors: PropTypes.func.isRequired,
  changeColor: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
  colors: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.number),
  ])),
  orientation: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOf(orientations)),
  ]),
};

GradientContainer.defaultProps = {
  style: {},
  className: '',
  orientation: [
    'bottom',
    'right',
  ],
  colors: [
  // R    G    B
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
  ],
};

export default connect(mapStateToProps, actions, mergeProps)(GradientContainer);
