/* eslint-disable no-unused-expressions */
import * as yup from 'yup';
import React, { Component } from 'react';
import TextField, { SelectField, RadioGroup, Button } from '../../components';
import { option, FootBall, Cricket } from '../../configs/constants';

class InputDemo extends Component {
  schema = yup.object().shape({
    name: yup.string().required().min(3).label('for name'),
    value: yup.string().required().label('for value'),
    radio: yup.string().required().label('for radio'),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      value: '',
      radio: '',
      error: '',
    };
  }

  handleNamechange = (event) => {
    this.setState({
      name: event.target.value,
    }, this.validate);
  }


  handleSportChange = (event) => {
    this.setState({
      value: event.target.value,
    }, this.validate);
  }

  handleRadioChange = (event) => {
    this.setState({
      radio: event.target.value,
    }, this.validate);
  }

  validate = () => {
    const { name, value, radio } = this.state;
    this.schema.validate({ name, value, radio }).then(() => {
      this.setState({

      });
    })
  }

  render() {
    let array;
    const {
      name, value, radio, error,
    } = this.state;
    if (value === 'FootBall') {
      array = FootBall;
    } else if (value === 'Cricket') {
      array = Cricket;
    }
    return (
      <>
        <div>
          <h3>Name</h3>
          <TextField
            value={name}
            onChange={this.handleNamechange}
            onBlur={this.handleTouched}
            error={error}
          />
        </div>
        <div>
          <h3>Select the Game You Play</h3>
          <SelectField
            options={option}
            onChange={this.handleSportChange}
          />
        </div>
        {
          (value) ? <RadioGroup options={array} onChange={this.handleRadioChange} /> : ''
        }
        <div style={{ textAlign: 'right' }}>
          <Button value="Cancel" />
          <Button value="Submit" />
        </div>
      </>
    );
  }
}
export default InputDemo;
