import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthLayout } from '../layouts';

const propTypes = {
  component: PropTypes.element.isRequired,
};

class AuthRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { component: ChildComponent, ...rest } = this.props;
    localStorage.removeItem('Admin');
    return (
      <Route
        {...rest}
        render={matchProps => (
          <AuthLayout>
            <ChildComponent {...matchProps} />
          </AuthLayout>
        )}
      />
    );
  }
}
AuthRoute.propTypes = propTypes;

export default AuthRoute;
