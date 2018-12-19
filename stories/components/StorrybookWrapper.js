import React from 'react';

import './StorybookWrapper.scss'; //eslint-disable-line

export default function StorybookWrapper({children}) {
  return (
    <div className="storybook-wrapper">{children}</div>
  );
}
