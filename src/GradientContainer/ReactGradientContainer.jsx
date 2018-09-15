/*
* @Author: JoseMunoz
* @Date:   2018-06-10 10:01:27
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-09-15T15:26:22-06:00
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
});

class GradientContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { changeColor } = this.props;

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
      background: linear-gradient(to left bottom, ${start}, ${end});
    `;

    return <GradientBackground {...passedProps} />;
  }
}

GradientContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  changeColor: PropTypes.func.isRequired,
};

GradientContainer.defaultProps = {
  style: {},
  className: '',
};

export default connect(mapStateToProps, actions, mergeProps)(GradientContainer);
