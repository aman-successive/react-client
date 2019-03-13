/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import * as yup from 'yup';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Person from '@material-ui/icons/Person';
import Email from '@material-ui/icons/Email';
import CircularProgress from '@material-ui/core/CircularProgress';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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

const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8}$/;

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

class AddDialog extends Component {
  schema = yup.object().shape({
    name: yup.string().min(3).required().label('name'),
    email: yup.string().email().required().label('email'),
    password: yup.string().matches(passwordRegex, 'Must contain 8 characters, atleast one uppercase letter, one lowercase and one number').required().label('password'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required().label('confirm password'),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      loading: false,
      touched: false,
      hasError: false,
    };
  }

  handlechange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    }, this.removeErrors(field));
  };

  handleSubmit = async (e, openSnackbar, onSubmit) => {
    this.setState({
      loading: true,
    });
    const { name, email, password } = this.state;
    const data = {
      name,
      email,
      password,
    };
    e.preventDefault();
    const result = await callApi('/api/trainee', 'post', data);
    if (result.status === 200) {
      onSubmit(data);
      openSnackbar(result.data.message, 'success');
      this.setState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        loading: false,
      });
    } else {
      onSubmit({});
      openSnackbar(result.message, 'error');
      this.setState({
        loading: false,
      });
    }
  }

  removeErrors= field => () => {
    const {
      name,
      email,
      password,
      confirmPassword,
      error,
      hasError,
    } = this.state;
    this.schema.validate({
      name,
      email,
      password,
      confirmPassword,
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
      password,
      confirmPassword,
      error,
    } = this.state;
    this.schema.validate({
      name,
      email,
      password,
      confirmPassword,
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
      name,
      email,
      password,
      confirmPassword,
      error,
      loading,
    } = this.state;
    return (
      <>
        <Dialog
          fullWidth
          maxWidth="md"
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
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
            <Grid container spacing={24} fullWidth>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  error={error.password}
                  value={password}
                  type="password"
                  label="Password"
                  onClick={this.handlechange('password')}
                  onChange={this.handlechange('password')}
                  onBlur={this.getError('password')}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VisibilityOff />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText className={classes.error}>{error.password}</FormHelperText>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  error={error.confirmPassword}
                  value={confirmPassword}
                  type="password"
                  label="Confirm Password"
                  onClick={this.handlechange('confirmPassword')}
                  onChange={this.handlechange('confirmPassword')}
                  onBlur={this.getError('confirmPassword')}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VisibilityOff />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText className={classes.error}>{error.confirmPassword}</FormHelperText>
              </Grid>
            </Grid>
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
                <SnackBarConsumer>
                  {({ openSnackbar }) => (
                    <Button
                      onClick={(e) => {
                        this.handleSubmit(e, openSnackbar, onSubmit);
                      }}
                      color="primary"
                      disabled={loading}
                    >
                      {
                        loading ? <CircularProgress size={25} /> : 'SUBMIT'
                      }
                    </Button>
                  )}
                </SnackBarConsumer>
              )
            }
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

AddDialog.propTypes = propTypes;
export default withStyles(styles)(AddDialog);
