/* eslint-disable no-unused-expressions */
import * as yup from 'yup';
import React, { Component } from 'react';
import TextField, { SelectField, RadioGroup, Button } from '../../components';
import { option, RADIO_OPTIONS } from '../../configs/constants';

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
      touched: false,
      hasError: false,
    };
  }

  hasError= field => () => {
    const {
      name,
      value,
      radio,
    } = this.state;
    let error = false;
    this.schema.validate({ name, value, radio }, { abortEarly: false }).catch((err) => {
      err.inner.forEach((errors) => {
        if (errors.path === field) {
          error = true;
        }
      });
    });
    return error;
  }

  handlechange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    }, this.removeErrors(field));
  };

  removeErrors= field => () => {
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
        hasError: this.hasError(field),
        touched: true,
      });
    }).catch((err) => {
      if (!err.inner.some(errors => errors.path === field) && hasError) {
        this.setState({
          error: { ...error, [field]: '' },
          hasError: this.hasError(field),
          touched: false,
        });
      }
    });
  }

  handleBlur=field => this.getError(field);

  getError=field => () => {
    const {
      name,
      value,
      radio,
      error,
    } = this.state;
    this.schema.validate({ name, value, radio }, { abortEarly: false }).catch((err) => {
      err.inner.forEach((errors) => {
        if (errors.path === field) {
          this.setState({
            error: { ...error, [field]: errors.message },
            hasError: this.hasError(field),
            touched: false,
          });
        }
      });
    });
  }

  isTouched = () => {
    const { touched, hasError } = this.state;
    if (touched && hasError) {
      return false;
    }
    return true;
  }

  render() {
    let array;
    const {
      name, value, error,
    } = this.state;
    if (value) {
      array = RADIO_OPTIONS[value];
    }
    return (
      <>
        <div>
          <h3>Name</h3>
          <TextField
            value={name}
            onClick={this.handlechange('name')}
            onChange={this.handlechange('name')}
            onBlur={this.handleBlur('name')}
            error={error.name}
          />
        </div>
        <div>
          <h3>Select the Game You Play</h3>
          <SelectField
            value={value}
            options={option}
            onClick={this.handlechange('value')}
            onChange={this.handlechange('value')}
            onBlur={this.handleBlur('value')}
            error={error.value}
          />
        </div>
        {
          (value && (value !== 'select')) ? <RadioGroup options={array} onChange={this.handlechange('radio')} onBlur={this.handleBlur('radio')} error={error.radio} /> : ''
        }
        <div style={{ textAlign: 'right' }}>
          <Button value="Cancel" />
          <Button value="Submit" disabled={this.isTouched()} color="submit" />
        </div>
      </>
    );
  }
}
export default InputDemo;
