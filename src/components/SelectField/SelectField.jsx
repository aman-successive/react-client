import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style';

const propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  defaultText: PropTypes.string,
};
const defaultProps = {
  error: '',
  options: [],
  value: '',
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
          <option key={defaultText} value={defaultText}>{defaultText}</option>
          {
            options.map(option => <option key={option.label} value={option.label}>{option.label}</option>)
          }
        </select>
      </>
    );
  }
}

SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;
export default SelectField;
