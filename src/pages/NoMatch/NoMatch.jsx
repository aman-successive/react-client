import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  NoMatchUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  NoMatchContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
});

function NoMatch(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.NoMatchUnit}>
        <div className={classes.NoMatchContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              No Match
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Seems like the page you are looking for does not exist
          </Typography>
        </div>
      </div>
    </React.Fragment>
  );
}

NoMatch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoMatch);
