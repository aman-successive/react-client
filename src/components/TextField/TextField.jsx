import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  hasErrors: PropTypes.bool,
  isTouched: PropTypes.bool,
  getErrors: PropTypes.string,
};
const defaultProps = {
  error: '',
  hasErrors: false,
  isTouched: false,
  getErrors: '',
};
const TextField = (props) => {
  const {
    error, ...rest
  } = props;
  const errorStyle = (error) ? { ...style.error } : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base, ...errorStyle }} />
      {(error) ? <p style={{ color: 'red' }}>{error}</p> : ''}
    </>
  );
};

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;

export default TextField;
