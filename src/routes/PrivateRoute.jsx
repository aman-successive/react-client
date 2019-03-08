import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts';

const propTypes = {
  component: PropTypes.element.isRequired,
};

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { component: ChildComponent, ...rest } = this.props;
    if (localStorage.getItem('Admin')) {
      return (
        <Route
          {...rest}
          render={matchProps => (
            <PrivateLayout>
              <ChildComponent {...matchProps} />
            </PrivateLayout>
          )}
        />
      );
    }
    return (
      <Redirect to="/login" />
    );
  }
}
PrivateRoute.propTypes = propTypes;

export default PrivateRoute;
