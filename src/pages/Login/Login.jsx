/* eslint-disable react/forbid-prop-types */
import * as yup from 'yup';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { TextField, IconButton } from '@material-ui/core';
import Email from '@material-ui/icons/Email';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

const propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 100,
    width: 500,
  },
  eye: {
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
});

const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8}$/;

class Login extends Component {
  schema = yup.object().shape({
    email: yup.string().email().required().label('email'),
    password: yup.string().matches(passwordRegex, 'Must contain 8 characters, atleast one uppercase letter, one lowercase and one number').required().label('password'),
  });

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        email: '',
        password: '',
      },
      touched: false,
      hasError: false,
      passwordIsMasked: true,
    };
  }

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };

  handlechange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    }, this.removeErrors(field));
  };

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
    const { classes } = this.props;
    const {
      email,
      password,
      error,
      passwordIsMasked,
    } = this.state;
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper className={classes.root} elevation={1}>
            <TextField
              value={email}
              label="Email Address"
              fullWidth
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
            <TextField
              fullWidth
              value={password}
              type={passwordIsMasked ? 'password' : 'text'}
              label="Password"
              onClick={this.handlechange('password')}
              onChange={this.handlechange('password')}
              onBlur={this.getError('password')}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      className={classes.eye}
                      onClick={this.togglePasswordMask}
                    >
                      {passwordIsMasked ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText className={classes.error}>{error.password}</FormHelperText>
            {
              this.checkDisabled() ? (
                <Button onClick={this.handleClose} color="primary" fullWidth disabled>
              SIGN IN
                </Button>
              ) : (
                <Button onClick={this.handleClose} color="primary" fullWidth>
              SIGN IN
                </Button>
              )
            }
          </Paper>
        </div>
      </>
    );
  }
}

Login.propTypes = propTypes;

export default withStyles(styles)(Login);
