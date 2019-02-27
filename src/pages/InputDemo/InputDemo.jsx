import React, { Component } from 'react';
import TextField, { SelectField, RadioGroup } from '../../components';
import { option, RADIO_OPTIONS } from '../../configs/constants';

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      value: '',
    };
  }

  handleNamechange = (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  handleSportChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    let array;
    const { name, value } = this.state;
    if (value) {
      array = RADIO_OPTIONS[value];
    }
    return (
      <>
        <div>
          <h3>Name</h3>
          <TextField value={name} onChange={this.handleNamechange} />
        </div>
        <div>
          <h3>Select the Game You Play</h3>
          <SelectField options={option} onChange={this.handleSportChange} />
        </div>
        {
          (value) ? <RadioGroup options={array} /> : ''
        }
      </>
    );
  }
}
export default InputDemo;
