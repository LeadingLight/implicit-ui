import React from 'react';
import PropTypes from 'prop-types';

export function Paragraph({text}) {
  return <p>{text}</p>;
}

Paragraph.propTypes = {text: PropTypes.string.isRequired};

export function MyTitle() {
  return <h1>My Title</h1>;
}

export function Container({children, text}) {
  return (
    <div>
      <h3>{text}</h3>
      <div>
        {children}
      </div>
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  text: PropTypes.string
};

Container.defaultProps = {
  children: <span>Empty Container</span>,
  text: 'Container Header'
};

export function PropsContainer({Comp1, Comp2}) {
  return (
    <div>
      <Comp1 />
      <Comp2 />
    </div>
  );
}

PropsContainer.propTypes = {
  Comp1: PropTypes.func,
  Comp2: PropTypes.func
};

PropsContainer.defaultProps = {
  Comp1: <span>Default1</span>,
  Comp2: <span>Default2</span>
};
