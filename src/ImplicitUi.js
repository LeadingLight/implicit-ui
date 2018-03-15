import React from 'react';
import PropTypes from 'prop-types';

export default function ImplicitUi({components, ui}) {
  return renderListOfElements(components, ui);
}

ImplicitUi.propTypes = {
  components: PropTypes.object.isRequired,
  ui: PropTypes.array.isRequired
};

function renderListOfElements(components, ui) {
  const NESTING_LEVEL = 2;

  if (!components) return null;
  if (!ui) return null;
  if (typeof ui === 'object' && !Array.isArray(ui)) {
    console.error('Expected a list of Components, but recived an Object: ', JSON.stringify(ui, null, NESTING_LEVEL));

    return null;
  }

  return (
    ui.map((element, index) => {
      const UiElement = getElement(components, element);
      const props = getElementProps(components, element);
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

function getElementProps(components, element) {
  if (typeof element === 'string') return {};
  if (!element.props) return {};

  const replacedProps = scanPropsForComponentsAndReplace(components, element.props);

  return {...element.props, ...replacedProps};
}

function scanPropsForComponentsAndReplace(components, propObjects) {
  const keys = Object.keys(propObjects);
  const componentProps = {};

  keys.forEach((key) => {
    const propObject = propObjects[key];

    if (propObject === null) return;
    if (typeof propObject !== 'object') return;
    if (Array.isArray(propObject)) return;
    if (!propObject.name) return;

    let component = getElement(components, propObject);

    if (!component) return;
    if (propObject.props || propObject.children) component = createPropsWrapper(components, component, propObject);

    componentProps[key] = component;
  });

  return componentProps;
}

function createPropsWrapper(components, Component, specObject) {
  return function PropertyWrapper() {
    if (!specObject.props && !specObject.children) return <Component />;
    if (!specObject.children) return <Component {...specObject.props} />;
    const childElements = renderListOfElements(components, specObject.children);

    return <Component {...specObject.props}>{childElements}</Component>;
  };
}

function getElementChildren(element) {
  if (typeof element === 'string') return undefined;
  if (!element.children) return undefined;

  return element.children;
}
