/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
};

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <footer className={classes.footer}>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            &copy; Successive Technologies
          </Typography>
        </footer>
      </React.Fragment>
    );
  }
}
Footer.propTypes = propTypes;

export default withStyles(styles)(Footer);
