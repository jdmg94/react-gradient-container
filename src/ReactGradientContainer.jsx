/*
* @Author: JoseMunoz
* @Date:   2018-06-10 10:01:27
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-09-14T14:03:20-06:00
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
  background: state.gradient,
});

class GradientContainer extends Component {
  componentDidMount() {
    const { changeColor, setTask } = this.props;

    const task = setInterval(changeColor, 250);
    setTask(task);
  }

  componentWillUnmount() {
    const { removeGradient } = this.props;

    removeGradient();
  }

  render() {
    const {
      style,
      children,
      className,
      background,
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
      background: ${background};
    `;

    return <GradientBackground {...passedProps} />;
  }
}

GradientContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  className: PropTypes.string,
  setTask: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  changeColor: PropTypes.func.isRequired,
  background: PropTypes.string.isRequired,
  removeGradient: PropTypes.func.isRequired,
};

GradientContainer.defaultProps = {
  style: {},
  className: '',
};

export default connect(mapStateToProps, actions, mergeProps)(GradientContainer);
