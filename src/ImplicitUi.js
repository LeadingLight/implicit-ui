import React from 'react';
import PropTypes from 'prop-types';

import {T9nTagsProvider, T9nContext} from './T9n';

export default function ImplicitUi({components, ui, t9n, showDefaultTag}) {
  return (
    <T9nTagsProvider value={{translations: t9n, showDefaultTag}}>
      <T9nContext contextName={getBaseContext(ui)}>
        {renderUiElements(components, ui)}
      </T9nContext>
    </T9nTagsProvider>
  );
}

ImplicitUi.propTypes = {
  components: PropTypes.object.isRequired,
  showDefaultTag: PropTypes.bool,
  t9n: PropTypes.object,
  ui: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

ImplicitUi.defaultProps = {
  showDefaultTag: false,
  t9n: null,
  ui: []
};

function renderUiElements(components, uiProp) {
  const ui = prepareUiObject(uiProp);

  if (!components) return null;
  if (!ui) return null;

  return (
    ui.map((element, index) => {
      const UiElement = getElement(components, element);
      const props = getElementProps(components, element);
      const children = getElementChildren(element);

      if (!element.t9nContext || element.t9nContext === '') {
        return renderElement({index, components, UiElement, props, children});
      }

      return (
        <T9nContext key={index} contextName={element.t9nContext}>
          {renderElement({index, components, UiElement, props, children})}
        </T9nContext>
      );
    })
  );
}

function renderElement({index, components, UiElement, props, children}) {
  if (!UiElement) return null;
  if (!children) return <UiElement key={index} {...props} />;
  const childElements = renderUiElements(components, children);

  return (
    <UiElement key={index} {...props}>
      {childElements}
    </UiElement>
  );
}

function getElement(components, element) {
  if (typeof element === 'string') return components[element];
  if (typeof element === 'object') {
    if (element.render && components[element.name]) {
      const Comp = components[element.name];

      return React.createElement(Comp);
    }

    return components[element.name];
  }

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

    if (propObject.render !== true) {
      component = createPropsWrapper(components, component, propObject);
    }

    componentProps[key] = component;
  });

  return componentProps;
}

function createPropsWrapper(components, Component, specObject) {
  return function PropertyWrapper() {
    if (!specObject.t9nContext) return renderPropComponent(components, Component, specObject);

    return (
      <T9nContext contextName={specObject.t9nContext}>
        {renderPropComponent(components, Component, specObject)}
      </T9nContext>
    );
  };
}

function renderPropComponent(components, Component, specObject) {
  if (!specObject.props && !specObject.children) return <Component />;
  if (!specObject.children) return <Component {...specObject.props} />;
  const childElements = renderUiElements(components, specObject.children);

  return (
    <Component {...specObject.props}>
      {childElements}
    </Component>
  );
}

function getElementChildren(element) {
  if (typeof element === 'string') return undefined;
  if (!element.children) return undefined;

  return element.children;
}
