/* eslint-disable no-unused-expressions */
import * as yup from 'yup';
import React, { Component } from 'react';
import TextField, { SelectField, RadioGroup, Button } from '../../components';
import { option, FootBall, Cricket } from '../../configs/constants';

class InputDemo extends Component {
  schema = yup.object().shape({
    name: yup.string().min(3).required().label('name'),
    value: yup.string().required().label('value'),
    radio: yup.string().required().label('radio'),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      value: '',
      radio: '',
      error: {
        name: '',
        value: '',
        radio: '',
      },
      touched: {
        name: false,
        value: false,
        radio: false,
      },
      hasError: false,
    };
  }

  handlechange = field => (event) => {
    const { touched } = this.state;
    this.setState({
      [field]: event.target.value,
      touched: { ...touched, [field]: true },
    }, this.getError(field));
  };

  getError=field => () => {
    const {
      name,
      value,
      radio,
      error,
      hasError,
    } = this.state;
    this.schema.validate({ name, value, radio }, { abortEarly: false }).then(() => {
      this.setState({
        error: { ...error, [field]: '' },
        hasError: false,
      });
    }).catch((err) => {
      err.inner.forEach((errors) => {
        if (errors.path === field) {
          this.setState({
            error: { ...error, [field]: errors.message },
            hasError: true,
          });
        }
      });
      if (!err.inner.some(errors => errors.path === field) && hasError) {
        this.setState({
          error: { ...error, [field]: '' },
          hasError: false,
        });
      }
    });
  }

  // checkDisabled = () => {
  //   const { radio, hasError } = this.state;
  //   if (radio && hasError) {
  //     return true;
  //   }
  // }

  render() {
    let array;
    const {
      name, value, error,
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
            onClick={this.handlechange('name')}
            onChange={this.handlechange('name')}
            onBlur={this.getError('name')}
            error={error.name}
          />
        </div>
        <div>
          <h3>Select the Game You Play</h3>
          <SelectField
            options={option}
            onClick={this.handlechange('value')}
            onChange={this.handlechange('value')}
            onBlur={this.getError('value')}
            error={error.value}
          />
        </div>
        {
          (value) ? <RadioGroup options={array} onChange={this.handlechange('radio')} onBlur={this.getError('radio')} error={error.radio} /> : ''
        }
        <div style={{ textAlign: 'right' }}>
          <Button value="Cancel" />
          <Button value="Submit" disabled />
        </div>
      </>
    );
  }
}
export default InputDemo;
