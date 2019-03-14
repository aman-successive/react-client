/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import withLoaderAndMessage from '../HOC';

const propTypes = {
  id: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  orderBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object),
  count: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
};

const defaultProps = {
  id: '',
  columns: [],
  data: [],
  actions: [],
  count: 0,
  page: 0,
  rowsPerPage: 100,
};

const styles = theme => ({
  root: {
    height: 600,
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
  iconCell: {
    display: 'flex',
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
      page,
      count,
      actions,
      rowsPerPage,
      onChangePage,
    } = this.props;
    const newId = '_id';
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
                <TableRow key={trainee.id} hover className={classes.tableRow}>
                  {
                    columns.map(cell => <TableCell onClick={() => onSelect(trainee[newId])} key={cell.field} align={cell.align}>{(cell.format) ? cell.format(trainee[cell.field]) : trainee[cell.field]}</TableCell>)
                  }
                  <TableCell>
                    {
                      actions.map(action => <IconButton className={classes.iconCell} onClick={() => action.handler(trainee)}>{action.icon}</IconButton>)
                    }
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
          {
            (count !== 0) ? (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[]}
                    colSpan={3}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                      'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                      'aria-label': 'Next Page',
                    }}
                    onChangePage={onChangePage}
                  />
                </TableRow>
              </TableFooter>
            ) : ''
          }
        </Table>
      </Paper>
    );
  }
}
Tables.propTypes = propTypes;
Tables.defaultProps = defaultProps;

export default withStyles(styles)(withLoaderAndMessage(Tables));
