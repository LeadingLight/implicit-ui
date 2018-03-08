import React from 'react';
import PropTypes from 'prop-types';

export default function ImplicitUi({components, ui}) {
  return renderListOfElements(components, ui);
}

ImplicitUi.propTypes = {ui: PropTypes.array.isRequired};

function renderListOfElements(components, ui) {
  if (!components) return null;
  if (!ui) return null;

  return (
    ui.map((element, index) => {
      const UiElement = getElement(components, element);
      const props = getElementProps(element);
      const children = getElementChildren(element);

      if (!UiElement) return null;
      if (!children) return <UiElement key={index} {...props} />;
      const childElements = renderListOfElements(components, children);

      return <UiElement key={index} {...props}>{childElements}</UiElement>;
    })
  );
}

function getElement(components, element) {
  if (typeof element === 'string') return components[element];
  if (typeof element === 'object') return components[element.name];

  return undefined;
}

function getElementProps(element) {
  if (typeof element === 'string') return {};
  if (!element.props) return {};

  return element.props;
}

function getElementChildren(element) {
  if (typeof element === 'string') return undefined;
  if (!element.children) return undefined;

  return element.children;
}
