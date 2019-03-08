import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';

const propTypes = {
  children: PropTypes.element.isRequired,
};

class AuthLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <>
        <div style={{ margin: 10 }} className="main">{children}</div>
        <Footer />
      </>

    );
  }
}
AuthLayout.propTypes = propTypes;

export default AuthLayout;
