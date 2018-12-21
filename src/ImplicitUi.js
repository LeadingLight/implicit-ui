/* eslint-disable max-params */
import React from 'react';
import PropTypes from 'prop-types';

import {T9nTagsProvider, T9nContext} from './T9n';

export default function ImplicitUi({components, ui, t9n, showDefaultTag}) {
  return (
    <T9nTagsProvider value={t9n}>
      <T9nContext contextName={getBaseContext(ui)}>{
        renderUiElements(
          components,
          ui,
          {
            t9nContext: getBaseContext(ui),
            showDefaultTag
          })}
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

//


function renderUiElements(components, uiProp, {showDefaultTag}) {
  const ui = prepareUiObject(uiProp);

  if (!components) return null;
  if (!ui) return null;

  return (
    ui.map((element, index) => {
      const UiElement = getElement(components, element);
      const props = getElementProps(components, element, {showDefaultTag});
      const children = getElementChildren(element);

      if (!element.t9nContext || element.t9nContext === '') {
        return renderElement(index, components, UiElement, props, children, showDefaultTag);
      }

      return (
        <T9nContext key={index} contextName={element.t9nContext}>
          {renderElement(index, components, UiElement, props, children, showDefaultTag)}
        </T9nContext>
      );
    })
  );
}

function renderElement(index, components, UiElement, props, children, showDefaultTag) {
  if (!UiElement) return null;
  if (!children) return <UiElement key={index} {...props} showDefaultTag={showDefaultTag} />;
  const childElements = renderUiElements(components, children, {showDefaultTag});

  return (
    <UiElement
      key={index}
      {...props}
      showDefaultTag={showDefaultTag}>
      {childElements}
    </UiElement>
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

function getElementProps(components, element, {showDefaultTag}) {
  if (typeof element === 'string') return {};
  if (!element.props) return {};

  const replacedProps = scanPropsForComponentsAndReplace(components, element.props, {showDefaultTag});

  return {...element.props, ...replacedProps};
}

function scanPropsForComponentsAndReplace(components, propObjects, {showDefaultTag}) {
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

    component = createPropsWrapper({
      components,
      Component: component,
      specObject: propObject,
      showDefaultTag
    });
    componentProps[key] = component;
  });

  return componentProps;
}

function createPropsWrapper({components, Component, specObject, showDefaultTag}) {
  return function PropertyWrapper() {
    if (!specObject.props && !specObject.children) return <Component showDefaultTag={showDefaultTag} />;
    if (!specObject.children) return <Component {...specObject.props} showDefaultTag={showDefaultTag} />;
    const childElements = renderUiElements(components, specObject.children, {showDefaultTag});

    return (
      <Component
        {...specObject.props}
        showDefaultTag={showDefaultTag}>{childElements}
      </Component>
    );
  };
}

function getElementChildren(element) {
  if (typeof element === 'string') return undefined;
  if (!element.children) return undefined;

  return element.children;
}
