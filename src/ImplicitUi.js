import React from 'react';
import PropTypes from 'prop-types';

import {T9nProvider} from './T9n';

export default function ImplicitUi({components, ui, t9n}) {
  return <T9nProvider value={t9n}>{renderUiElements(components, ui, getBaseContext(ui))}</T9nProvider>;
}

ImplicitUi.propTypes = {
  components: PropTypes.object.isRequired,
  t9n: PropTypes.object,
  ui: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

ImplicitUi.defaultProps = {
  t9n: null,
  ui: []
};


function renderUiElements(components, uiProp, t9nContext) {
  const ui = prepareUiObject(uiProp);

  if (!components) return null;
  if (!ui) return null;

  return (
    ui.map((element, index) => {
      const UiElement = getElement(components, element);
      const context = getElementContext(element, t9nContext);
      const props = getElementProps(components, element, context);
      const children = getElementChildren(element);

      if (!UiElement) return null;
      if (!children) return <UiElement key={index} {...props} t9nContext={context} />;
      const childElements = renderUiElements(components, children, context);

      return <UiElement key={index} {...props} t9nContext={context}>{childElements}</UiElement>;
    })
  );
}

function getElement(components, element) {
  if (typeof element === 'string') return components[element];
  if (typeof element === 'object') return components[element.name];

  return undefined;
}

function prepareUiObject(ui) {
  const TAB_INDENTATION = 2;

  const errorMessage = `Expected a Component or list of Components, but recived: ${JSON.stringify(ui, null, TAB_INDENTATION)}`;

  if (!ui) return ui;
  if (Array.isArray(ui)) return ui;
  if (typeof ui !== 'object') return logErrorAndReturn(errorMessage, null);
  if (ui.name) return [ui];
  if (ui.children && Array.isArray(ui.children)) return ui.children;

  return logErrorAndReturn(errorMessage, null);
}

function logErrorAndReturn(message, returnValue) {
  console.error(message);

  return returnValue;
}

function getBaseContext(ui) {
  if (typeof ui === 'object' && ui.t9nContext) return ui.t9nContext;

  return '';
}

function getElementContext(element, t9nContext) {
  if (element.t9nContext) return `${t9nContext}.${element.t9nContext}`;

  return t9nContext;
}

function getElementProps(components, element, t9nContext) {
  if (typeof element === 'string') return {};
  if (!element.props) return {};

  const replacedProps = scanPropsForComponentsAndReplace(components, element.props, t9nContext);

  return {...element.props, ...replacedProps};
}

function scanPropsForComponentsAndReplace(components, propObjects, t9nContext) {
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

    component = createPropsWrapper({components, Component: component, specObject: propObject, t9nContext});
    componentProps[key] = component;
  });

  return componentProps;
}

function createPropsWrapper({components, Component, specObject, t9nContext}) {
  const context = getElementContext(specObject, t9nContext);

  return function PropertyWrapper() {
    if (!specObject.props && !specObject.children) return <Component t9nContext={context} />;
    if (!specObject.children) return <Component {...specObject.props} t9nContext={context} />;
    const childElements = renderUiElements(components, specObject.children, context);

    return <Component {...specObject.props} t9nContext={context}>{childElements}</Component>;
  };
}

function getElementChildren(element) {
  if (typeof element === 'string') return undefined;
  if (!element.children) return undefined;

  return element.children;
}
