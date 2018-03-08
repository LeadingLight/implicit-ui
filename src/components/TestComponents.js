import React from 'react';
import PropTypes from 'prop-types';

export function Paragraph({text}) {
  return <p>{text}</p>;
}

Paragraph.propTypes = {text: PropTypes.string.isRequired};

export function MyTitle() {
  return <h1>My Title</h1>;
}
