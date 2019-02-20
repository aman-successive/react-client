import React from 'react';
import TextField, { Slider } from '../../components';
import { PUBLIC_IMAGE_FOLDER } from '../../configs/constants';

const Banners = [
  `${PUBLIC_IMAGE_FOLDER}cloud.jpg`,
  `${PUBLIC_IMAGE_FOLDER}default.png`,
  `${PUBLIC_IMAGE_FOLDER}dns-server.png`,
  `${PUBLIC_IMAGE_FOLDER}full-stack-web-development.jpg`,
  `${PUBLIC_IMAGE_FOLDER}js.jpg`,
  `${PUBLIC_IMAGE_FOLDER}load-balancer.png`,
];
const TextFieldDemo = () => (
  <>
    <div style={{ textAlign: 'center' }}>
      <Slider banners={Banners} />
    </div>
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
