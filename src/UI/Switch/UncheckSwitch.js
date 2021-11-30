import * as React from 'react';
import { Switch } from '@material-ui/core';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function UnCheckSwitch() {
  return (
    <div>
      <Switch {...label} />
    </div>
  );
}