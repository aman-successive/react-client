import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const propTypes = {
  err: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
const defaultProps = {
  err: '',
};
const TextField = (props) => {
  const {
    err, ...rest
  } = props;
  const errorStyle = (err) ? { ...style.error } : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base, ...errorStyle }} />
      {(err) ? <p style={{ color: 'red' }}>{err}</p> : ''}
    </>
  );
};

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;

export default TextField;
