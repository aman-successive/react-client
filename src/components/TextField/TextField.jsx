/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { err, ...rest } = props;
  const errorStyle = (err) ? { ...style.error } : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.base, ...errorStyle }} />
      {(err) ? <p style={{ color: 'red' }}>{err}</p> : ''}
    </>
  );
};
TextField.propTypes = {
  err: PropTypes.string,
};

TextField.defaultProps = {
  err: '',
};

export default TextField;
