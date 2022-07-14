import React from 'react';
import JsonView from '@site/src/components/JsonView';
import * as dcsReactHooks from 'dcs-react-hooks';
import * as dcsJs from 'dcs-js';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  JsonView,
  ...dcsReactHooks,
  ...dcsJs
};
export default ReactLiveScope;
