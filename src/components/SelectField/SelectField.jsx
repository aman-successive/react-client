import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style';

const propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  defaultText: PropTypes.string,
};
const defaultProps = {
  error: '',
  options: [],
  defaultText: 'select',
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
    return (
      <>
        <select {...rest} value={value} style={{ ...style.base }}>
          <option value={defaultText} disabled selected>{defaultText}</option>
          {
            options.map(option => <option value={option.label}>{option.label}</option>)
          }
        </select>
      </>
    );
  }
}

SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;
export default SelectField;
