/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

const propTypes = {
  match: PropTypes.object.isRequired,
};

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { match } = this.props;
    return (
      <>
        <Switch>
          <Route exact path={`${match.path}`} component={TraineeList} />
          <Route exact path={`${match.path}/:id`} component={TraineeDetail} />
        </Switch>
      </>
    );
  }
}
Trainee.propTypes = propTypes;

export default Trainee;
