import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts';

const propTypes = {
  component: PropTypes.func.isRequired,
};

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { component: ChildComponent, ...rest } = this.props;
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
}
PrivateRoute.propTypes = propTypes;

export default PrivateRoute;
