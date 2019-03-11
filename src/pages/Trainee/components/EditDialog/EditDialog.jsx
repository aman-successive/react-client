/* eslint-disable react/forbid-prop-types */
import * as yup from 'yup';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import InputAdornment from '@material-ui/core/InputAdornment';
import Person from '@material-ui/icons/Person';
import Email from '@material-ui/icons/Email';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
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
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

class EditDialog extends Component {
  schema = yup.object().shape({
    name: yup.string().min(3).required().label('name'),
    email: yup.string().email().required().label('email'),
  });

  constructor(props) {
    super(props);
    const { data } = this.props;
    const { _id, name, email } = data;
    this.state = {
      id: _id,
      name,
      email,
      error: {
        name: '',
        email: '',
      },
      touched: false,
      hasError: false,
    };
  }

  handlechange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    }, this.removeErrors(field));
  };

  handleSubmit = async (e, onSubmit, data, openSnackbar) => {
    e.preventDefault();
    const result = await callApi('/api/trainee', 'put', data);
    if (result.status) {
      onSubmit(data);
      openSnackbar(result.message, 'success');
    } else {
      openSnackbar('Error Message', 'error');
    }
  }

  removeErrors= field => () => {
    const {
      name,
      email,
      error,
      hasError,
    } = this.state;
    this.schema.validate({
      name,
      email,
    }, { abortEarly: false }).then(() => {
      this.setState({
        error: { ...error, [field]: '' },
        hasError: false,
        touched: true,
      });
    }).catch((err) => {
      if (!err.inner.some(errors => errors.path === field) && hasError) {
        this.setState({
          error: { ...error, [field]: '' },
          hasError: false,
          touched: false,
        });
      }
    });
  }

  getError=field => () => {
    const {
      name,
      email,
      error,
    } = this.state;
    this.schema.validate({
      name,
      email,
    }, { abortEarly: false }).catch((err) => {
      err.inner.forEach((errors) => {
        if (errors.path === field) {
          this.setState({
            error: { ...error, [field]: errors.message },
            hasError: true,
            touched: false,
          });
        }
      });
    });
  }

  checkDisabled = () => {
    const { touched, hasError } = this.state;
    if (touched && !hasError) {
      return false;
    }
    return true;
  }

  render() {
    const {
      classes,
      open,
      onClose,
      onSubmit,
    } = this.props;
    const {
      id,
      name,
      email,
      error,
    } = this.state;
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
              <DialogTitle id="form-dialog-title">Edit Trainee</DialogTitle>
              <DialogContent>
                <DialogContentText>
            Enter your Trainee Details
                </DialogContentText>
                <TextField
                  value={name}
                  label="Name *"
                  fullWidth
                  error={error.name}
                  onClick={this.handlechange('name')}
                  onChange={this.handlechange('name')}
                  onBlur={this.getError('name')}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText className={classes.error}>{error.name}</FormHelperText>
                <TextField
                  value={email}
                  label="Email Address"
                  fullWidth
                  error={error.email}
                  onClick={this.handlechange('email')}
                  onChange={this.handlechange('email')}
                  onBlur={this.getError('email')}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText className={classes.error}>{error.email}</FormHelperText>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} color="primary">
                CANCEL
                </Button>
                {
                  this.checkDisabled() ? (
                    <Button onClick={this.handleClose} color="primary" disabled>
                      SUBMIT
                    </Button>
                  ) : (
                    <Button
                      onClick={(e) => {
                        const userData = { id, name, email };
                        this.handleSubmit(e, onSubmit, userData, openSnackbar);
                      }}
                      color="primary"
                    >
                      SUBMIT
                    </Button>
                  )
                }
              </DialogActions>
            </Dialog>
          )}
        </SnackBarConsumer>

      </>
    );
  }
}

EditDialog.propTypes = propTypes;
export default withStyles(styles)(EditDialog);
