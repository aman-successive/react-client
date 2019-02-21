import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styling from './style';

const propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  color: 'primary',
  disabled: false,
  style: {},
};
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      color,
      disabled,
      ...rest
    } = this.props;
    return (
      <>
        <input type="submit" {...rest} disabled={disabled} style={{ ...styling.base, ...color }} />
      </>
    );
  }
}
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
