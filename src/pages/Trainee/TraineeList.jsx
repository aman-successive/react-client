import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { AddDialog, Tables } from './components';
import trainees from './data/trainee';
import columnData from './data/column';

const propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: 'asc',
      orderBy: '',
    };
  }

  handleRequestSort = (property) => {
    const { orderBy, order } = this.state;
    if (orderBy === property && order === 'desc') {
      this.setState({ order: 'asc', orderBy: property });
    } else {
      this.setState({ order: 'desc', orderBy: property });
    }
  };

  handleSelect = (id) => {
    const { history } = this.props;
    history.push(`/trainee/${id}`);
  }

  handleSubmit = (...values) => {
    this.setState({ open: false });
    console.log(...values);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open, order, orderBy } = this.state;
    return (
      <>
        <Button style={{ margin: 10 }} variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Add Trainee
        </Button>
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
        <Tables id="id" data={trainees} columns={columnData} order={order} orderBy={orderBy} onSort={this.handleRequestSort} onSelect={this.handleSelect} />
      </>
    );
  }
}
TraineeList.propTypes = propTypes;

export default TraineeList;
