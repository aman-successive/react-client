import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style';

const propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  defaultText: PropTypes.string,
  hasErrors: PropTypes.bool,
  isTouched: PropTypes.bool,
  getErrors: PropTypes.string,
};
const defaultProps = {
  error: '',
  options: [],
  defaultText: 'select',
  hasErrors: false,
  isTouched: false,
  getErrors: '',
};

class SelectField extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const {
      error,
      value,
      options,
      defaultText,
      ...rest
    } = this.props;
    const errorStyle = (error) ? { ...style.error } : {};
    return (
      <>
        <select {...rest} value={value} style={{ ...style.base, ...errorStyle }}>
          <option value={defaultText} disabled selected>{defaultText}</option>
          {
            options.map(option => <option value={option.label}>{option.label}</option>)
          }
        </select>
        {(error) ? <p style={{ color: 'red' }}>{error}</p> : ''}
      </>
    );
  }
}

SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;
export default SelectField;
