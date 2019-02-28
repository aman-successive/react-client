import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { AddDialog } from './components';
import trainees from './data/trainee';

class TraineeList extends Component {
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
        <div>
          <ul>
            {
              trainees.map(trainee => (
                <li>
                  <Link
                    to={`/trainee/${trainee.id}`}
                  >
                    {trainee.name}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </>
    );
  }
}
export default TraineeList;
