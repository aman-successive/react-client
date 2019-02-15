import React from 'react';
import TextField from '../../components';

const TextFieldDemo = () => (
  <>
    <div>
      <h3>This is Disabled Input</h3>
      <TextField disabled value="Disabled Input" />
    </div>
    <div>
      <h3>This is Valid Input</h3>
      <TextField value="Accessible" />
    </div>
    <div>
      <h3>This is Input with errors</h3>
      <TextField value="101" err="Could not be greater than" />
    </div>
  </>
);
export default TextFieldDemo;
