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

  render() {
    const {
      open,
      onClose,
      onSubmit,
      data,
    } = this.props;
    return (
      <>
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
            <Button onClick={() => onSubmit(data)} color="primary">
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

DeleteDialog.propTypes = propTypes;
export default withStyles(styles)(DeleteDialog);
