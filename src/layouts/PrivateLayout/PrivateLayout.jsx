import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../components';

const propTypes = {
  children: PropTypes.element.isRequired,
};

class PrivateLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <>
        <Navbar />
        <div style={{ margin: 10 }} className="main">{children}</div>
      </>

    );
  }
}
PrivateLayout.propTypes = propTypes;

export default PrivateLayout;
