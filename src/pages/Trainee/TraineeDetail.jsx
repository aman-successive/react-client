/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import trainees from './data/trainee';
import NoMatch from '../NoMatch';


const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 2)]: {
      width: 1300,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  button: {
    textAlign: 'center',
    margin: 30,
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

class TraineeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTrainee = (id) => {
    let trainee;
    trainees.forEach((traineeDetail) => {
      if (traineeDetail.id === id) {
        trainee = traineeDetail;
      }
    });
    return trainee;
  }

  getDateFormatted = date => (moment(date).format('LLLL'))

  render() {
    const { classes, match } = this.props;
    const { id } = match.params;
    const trainee = this.getTrainee(id);
    if (!trainee) {
      return <NoMatch />;
    }
    return (
      <>
        <div className={classes.layout}>
          <main>
            <Card className={classes.card}>
              <Hidden xsDown>
                <CardMedia
                  className={classes.cardMedia}
                  image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                />
              </Hidden>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    {trainee.name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {this.getDateFormatted(trainee.createdAt)}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {trainee.email}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </main>
          <div className={classes.button}>
            <Button variant="contained" color="inherit"><Link color="inherit" underline="none" component={RouterLink} to="/trainee">Back</Link></Button>
          </div>
        </div>
      </>
    );
  }
}
TraineeDetail.propTypes = propTypes;

export default withStyles(styles)(TraineeDetail);
