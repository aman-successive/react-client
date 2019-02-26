/* eslint-disable react/forbid-prop-types */
import * as yup from 'yup';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { TextField, IconButton } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Email from '@material-ui/icons/Email';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
  eye: {
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8}$/;

const propTypes = {
  classes: PropTypes.object.isRequired,
};

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
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
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
          <TextField
            fullWidth
            error={error.password}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled
              >
              Sign in
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
              Sign in
              </Button>
            )
          }
        </Paper>
      </main>
    );
  }
}


Login.propTypes = propTypes;

export default withStyles(styles)(Login);
