import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styling from './style';

const propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  hasErrors: PropTypes.bool,
  isTouched: PropTypes.bool,
  getErrors: PropTypes.string,
};

const defaultProps = {
  color: 'primary',
  disabled: false,
  style: {},
  hasErrors: false,
  isTouched: false,
  getErrors: '',
};
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const {
      color,
      disabled,
      style,
      value,
      ...rest
    } = this.props;
    return (
      <>
        <input type="button" {...rest} value={value} style={{ ...styling.base, ...style, ...color }} />
      </>
    );
  }
}
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
