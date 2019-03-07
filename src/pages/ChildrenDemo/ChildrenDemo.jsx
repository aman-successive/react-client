import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Math } from '../../components';

class ChildrenDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <>
        <Math first={5} second={2} operator="/">
          {(first, second, operator, result) => (
            <Typography>
              {first}
              {operator}
              {second}
                =
              {result}
            </Typography>

          )}
        </Math>
        <Math first={5} second={2} operator="+">
          {(first, second, operator, result) => (
            <p>
              Sum of
              {' '}
              {first}
              {' '}
              and
              {' '}
              {second}
              {' '}
              is
              {' '}
              {result}
            </p>
          )}
        </Math>
        <Math first={5} second={2} operator="+">
          {(first, second, operator, result) => (
            <p>
              When we add
              {' '}
              {first}
              {' '}
              with
              {' '}
              {second}
              {' '}
              then we will get
              {' '}
              {result}
              {' '}
              as result.
            </p>
          )}
        </Math>
        <Math first={5} second={0} operator="/">
          {(first, second, operator, result) => (
            <p>
              {first}
              {operator}
              {second}
              =
              {result}
            </p>
          )}
        </Math>
        <Math first={5} second={0} operator="^">
          {(first, second, operator, result) => (
            <p>
              {first}
              {operator}
              {second}
              =
              {result}
            </p>
          )}
        </Math>
      </>

    );
  }
}

export default ChildrenDemo;
