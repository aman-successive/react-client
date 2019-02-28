/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Person from '@material-ui/icons/Person';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Trainee Portal
            </Typography>
            <Button color="inherit"><Link color="inherit" underline="none" component={RouterLink} to="/trainee">Trainee</Link></Button>
            <Button color="inherit"><Link color="inherit" underline="none" component={RouterLink} to="/Text">Textfield Demo</Link></Button>
            <Button color="inherit"><Link color="inherit" underline="none" component={RouterLink} to="/Input">Input Demo</Link></Button>
            <Button color="inherit"><Link color="inherit" underline="none" component={RouterLink} to="/Children">Children Demo</Link></Button>
            <Button color="inherit">
            Logout
              <Person className={classes.rightIcon} />
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = propTypes;

export default withStyles(styles)(Navbar);
