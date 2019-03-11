/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SnackBarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';
import { callApi } from '../../../../libs/utils/api';

const styles = () => ({
  eye: {
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
});

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = async (e, onSubmit, data, openSnackbar) => {
    e.preventDefault();
    const { _id } = data;
    const result = await callApi(`/api/trainee/${_id}`, 'delete', {});
    if (result.status) {
      onSubmit(data);
      openSnackbar(result.message, 'success');
    } else {
      openSnackbar(result.message, 'error');
    }
  }

  render() {
    const Date = '2019-02-14T18:15:11.778Z';
    const {
      open,
      onClose,
      onSubmit,
      data,
    } = this.props;
    return (
      <>
        <SnackBarConsumer>
          {({ openSnackbar }) => (
            <Dialog
              fullWidth
              maxWidth="md"
              open={open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Delete Trainee</DialogTitle>
              <DialogContent>
                <DialogContentText>
                Do you really want to delete this trainee?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} color="primary">
                CANCEL
                </Button>
                <Button
                  onClick={(e) => {
                    if (data.createdAt < Date) {
                      openSnackbar('Trainee Cannot be deleted', 'error');
                    } else {
                      this.handleSubmit(e, onSubmit, data, openSnackbar);
                    }
                  }}
                  color="primary"
                >
                DELETE
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </SnackBarConsumer>
      </>
    );
  }
}

DeleteDialog.propTypes = propTypes;
export default withStyles(styles)(DeleteDialog);
