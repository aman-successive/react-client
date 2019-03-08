import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { AddDialog } from './components';

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleSubmit = (...values) => {
    this.setState({ open: false });
    console.log(...values);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <>
        <Button style={{ margin: 10 }} variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Add Trainee
        </Button>
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
      </>
    );
  }
}
export default Trainee;
