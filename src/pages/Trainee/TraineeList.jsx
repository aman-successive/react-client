import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import {
  AddDialog, Tables, EditDialog, DeleteDialog,
} from './components';
import trainees from './data/trainee';
import columnData from './data/column';

const propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editDialogOpen: false,
      deleteDialogOpen: false,
      open: false,
      order: 'asc',
      orderBy: '',
      page: 0,
      data: '',
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

  handleEditDialogOpen = (trainee) => {
    this.setState({ editDialogOpen: true, data: trainee });
  }

  handleDeleteDialogOpen = (trainee) => {
    this.setState({ deleteDialogOpen: true, data: trainee });
  }

  handleEditDialogClose = () => {
    this.setState({ editDialogOpen: false });
  }

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialogOpen: false });
  }

  handleDeleteDialogSubmit = (values) => {
    this.setState({ deleteDialogOpen: false });
    console.log('Deleted Data', values);
  }

  handlePageChange = (event, pages) => {
    this.setState({
      page: pages,
    });
  }

  handleEditDialogSubmit = (...values) => {
    this.setState({ editDialogOpen: false });
    console.log(...values);
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
    const {
      open,
      order,
      orderBy,
      page,
      data,
      editDialogOpen,
      deleteDialogOpen,
    } = this.state;
    return (
      <>
        <Button style={{ margin: 10 }} variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Add Trainee
        </Button>
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
        <EditDialog
          open={editDialogOpen}
          data={data}
          onClose={this.handleEditDialogClose}
          onSubmit={this.handleEditDialogSubmit}
        />
        <DeleteDialog
          open={deleteDialogOpen}
          data={data}
          onClose={this.handleDeleteDialogClose}
          onSubmit={this.handleDeleteDialogSubmit}
        />
        <Tables
          id="id"
          data={trainees}
          columns={columnData}
          actions={[
            {
              icon: <EditIcon style={{ fontSize: 17 }} />,
              handler: this.handleEditDialogOpen,
            },
            {
              icon: <DeleteIcon style={{ fontSize: 17 }} />,
              handler: this.handleDeleteDialogOpen,
            },
          ]}
          order={order}
          orderBy={orderBy}
          onSort={this.handleRequestSort}
          onSelect={this.handleSelect}
          rowsPerPage={10}
          count={100}
          page={page}
          onChangePage={this.handlePageChange}
        />
      </>
    );
  }
}
TraineeList.propTypes = propTypes;

export default TraineeList;
