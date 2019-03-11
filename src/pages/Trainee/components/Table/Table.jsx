/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const propTypes = {
  id: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object.isRequired,
};

const defaultProps = {
  id: '',
  columns: [],
  data: [],
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      id,
      columns,
      data,
      classes,
    } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table} key={id}>
          <TableHead>
            <TableRow key="head">
              {
                columns.map(cell => <TableCell key={cell.field} align={cell.align}>{cell.label || cell.field}</TableCell>)
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map(trainee => (
                <TableRow key={trainee.id}>
                  {
                    columns.map(cell => <TableCell key={cell.field} align={cell.align}>{trainee[cell.field]}</TableCell>)
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
Tables.propTypes = propTypes;
Tables.defaultProps = defaultProps;

export default withStyles(styles)(Tables);
