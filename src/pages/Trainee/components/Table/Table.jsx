/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const propTypes = {
  id: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  orderBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
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
  tableRow: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createSortHandler = property => () => {
    const { onSort } = this.props;
    onSort(property);
  };

  render() {
    const {
      id,
      columns,
      data,
      order,
      orderBy,
      classes,
      onSelect,
    } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table} key={id}>
          <TableHead>
            <TableRow key="head">
              {
                columns.map(cell => (
                  <TableCell
                    key={cell.field}
                    align={cell.align}
                  >
                    <TableSortLabel
                      active={orderBy === cell.label}
                      direction={order}
                      onClick={this.createSortHandler(cell.label)}
                    >
                      {cell.label || cell.field}
                    </TableSortLabel>
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map(trainee => (
                <TableRow key={trainee.id} hover className={classes.tableRow} onClick={() => onSelect(trainee.id)}>
                  {
                    columns.map(cell => <TableCell key={cell.field} align={cell.align}>{(cell.format) ? cell.format(trainee[cell.field]) : trainee[cell.field]}</TableCell>)
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
