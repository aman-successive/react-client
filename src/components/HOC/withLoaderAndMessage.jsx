/* eslint-disable react/prop-types */
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function withLoaderAndMessage(Component) {
  return class WithLoader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const { loading, dataLength } = this.props;
      if (loading === true) {
        return (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress size={100} />
          </div>
        );
      } if (loading === false && dataLength) {
        return (
          <div>
            <Component {...this.props} />
          </div>
        );
      }
      return (
        <h1>Oops!! No more Trainees</h1>
      );
    }
  };
}

export default withLoaderAndMessage;
