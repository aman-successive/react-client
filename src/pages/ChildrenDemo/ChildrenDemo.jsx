import React, { Component } from 'react';
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
            <h1>
              {first}
              {operator}
              {second}
              =
              {result}
            </h1>
          )}
        </Math>
        <Math first={5} second={2} operator="+">
          {(first, second, operator, result) => (
            <h1>
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
            </h1>
          )}
        </Math>
        <Math first={5} second={2} operator="+">
          {(first, second, operator, result) => (
            <h1>
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
            </h1>
          )}
        </Math>
        <Math first={5} second={0} operator="/">
          {(first, second, operator, result) => (
            <h1>
              {first}
              {operator}
              {second}
              =
              {result}
            </h1>
          )}
        </Math>
        <Math first={5} second={0} operator="^">
          {(first, second, operator, result) => (
            <h1>
              {first}
              {operator}
              {second}
              =
              {result}
            </h1>
          )}
        </Math>
      </>

    );
  }
}

export default ChildrenDemo;
