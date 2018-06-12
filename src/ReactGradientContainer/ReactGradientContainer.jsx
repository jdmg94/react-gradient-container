/*
* @Author: JoseMunoz
* @Date:   2018-06-10 10:01:27
* @Last Modified by:   JoseMunoz
* @Last Modified time: 2018-06-10 22:33:28
*/
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
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

    const task = setInterval(changeColor, 100);
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

    const styles = StyleSheet.create({
      GradientContainer: {
        background,
        overflow: 'hidden',
        padding: '0.25rem',
        margin: '0.5rem 1.5rem',
        ...style,
      },
    });

    return (
      <div
        className={`${className} ${css(styles.GradientContainer)}`}
      >
        {children}
      </div>
    );
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
