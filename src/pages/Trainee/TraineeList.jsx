import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import {
  AddDialog, EditDialog, DeleteDialog,
} from './components';
import { Tables } from '../../components';
import columnData from './data/column';
import { callApi } from '../../libs/utils/api';
import { SnackBarConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';

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
      traineeList: '',
      limit: 10,
      skip: 0,
      loading: true,
      snackBarError: '',
    };
    const { limit, skip } = this.state;
    callApi(`/api/trainee?limit=${limit}&skip=${skip}`, 'get', {}).then((list) => {
      if (list.status === 200) {
        this.setState({
          snackBarError: '',
          traineeList: list.data.data.records,
          loading: false,
        });
      } else {
        this.setState({
          snackBarError: list.message,
          loading: false,
        });
      }
    });
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
    this.setState({ editDialogOpen: false, data: '' });
  }

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialogOpen: false, data: '' });
  }

  handleDeleteDialogSubmit = (values) => {
    console.log('Deleted Data', values);
    this.setState({ deleteDialogOpen: false, data: '' });
    const { limit, skip } = this.state;
    callApi(`/api/trainee?limit=${limit}&skip=${skip}`, 'get', {}).then((list) => {
      if (list.status === 200) {
        this.setState({
          traineeList: list.data.data.records,
          loading: false,
        }, () => {
          const { traineeList, page } = this.state;
          if (traineeList.length === 0) {
            const previousPage = page - 1;
            this.setState({
              loading: true,
              page: previousPage,
              skip: 10 * previousPage,
            });
            callApi(`/api/trainee?limit=${limit}&skip=${skip - limit}`, 'get', {}).then((newList) => {
              if (newList.status === 200) {
                this.setState({
                  traineeList: newList.data.data.records,
                  loading: false,
                });
              }
            });
          }
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  handlePageChange = (event, pages) => {
    this.setState({
      loading: true,
      page: pages,
      skip: 10 * pages,
    }, () => {
      const { limit, skip } = this.state;
      callApi(`/api/trainee?limit=${limit}&skip=${skip}`, 'get', {}).then((list) => {
        if (list.status === 200) {
          this.setState({
            traineeList: list.data.data.records,
            loading: false,
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      });
    });
  }

  handleEditDialogSubmit = (...values) => {
    console.log(...values);
    this.setState({ editDialogOpen: false, data: '' });
    const { limit, skip } = this.state;
    callApi(`/api/trainee?limit=${limit}&skip=${skip}`, 'get', {}).then((list) => {
      if (list.status === 200) {
        this.setState({
          traineeList: list.data.data.records,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };

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

  handleSnackBar = (snackBarError, openSnackbar) => {
    openSnackbar(snackBarError, 'error');
    this.setState({
      snackBarError: '',
    });
  }

  render() {
    const {
      open,
      order,
      orderBy,
      page,
      data,
      editDialogOpen,
      deleteDialogOpen,
      traineeList,
      loading,
      snackBarError,
    } = this.state;
    return (
      <>
        <Button style={{ margin: 10 }} variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Add Trainee
        </Button>
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
        {
          (data) ? (
            <>
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
            </>
          ) : ''
        }
        <SnackBarConsumer>
          {({ openSnackbar }) => ((snackBarError) ? (
            this.handleSnackBar(snackBarError, openSnackbar)
          ) : (
            <Tables
              id="id"
              data={traineeList}
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
              count={200}
              page={page}
              dataLength={traineeList.length}
              loading={loading}
              onChangePage={this.handlePageChange}
            />
          ))
          }
        </SnackBarConsumer>
      </>
    );
  }
}
TraineeList.propTypes = propTypes;

export default TraineeList;
