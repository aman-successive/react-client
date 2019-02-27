/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  error: PropTypes.string,
  // value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
};
const defaultTypes = {
  error: '',
  options: [],
};
class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const {
      error,
      options,
      ...rest
    } = this.props;
    return (
      <>
        <h3>What do you do?</h3>
        {
          options.map(option => <div {...rest} key={option.label}><input type="radio" name="Sports" value={option.label} key={option.label} />{option.label}</div>)
        }
        {(error) ? <p style={{ color: 'red' }}>{error}</p> : ''}
      </>
    );
  }
}
RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultTypes;
export default RadioGroup;
