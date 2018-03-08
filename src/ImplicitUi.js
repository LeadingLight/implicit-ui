import React from 'react';
import PropTypes from 'prop-types';

export default function ImplicitUi({components, ui}) {
  if (!components) return null;
  if (!ui) return null;

  return (
    ui.map((element, index) => {
      const UiElement = getElement(components, element);
      const props = getElementProps(element);

      if (!UiElement) return null;

      return <UiElement key={index} {...props} />;
    })
  );
}

ImplicitUi.propTypes = {ui: PropTypes.array.isRequired};

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

/*

const ONLY_ONE_ELEMENT = 1;
const FIRST_ELEMENT = 0;

function ImplicitElement({element: {name, childElements, props}, params}) {
  const ElementComp = getComponentByName(name);
  const parsedProps = parseProps(props);

  if (!childElements) return <ElementComp {...parsedProps} {...params} />;

  let childComponents = childElements.map(
    (childComp, index) =>
      <ImplicitElement key={index} element={childComp} params={params} />
  );

  if (childComponents.length === ONLY_ONE_ELEMENT) childComponents = childComponents[FIRST_ELEMENT];

  return <ElementComp {...parsedProps} {...params}>{childComponents}</ElementComp>;
}

ImplicitElement.propTypes = {
  element: PropTypes.object.isRequired,
  params: PropTypes.object
};

ImplicitElement.defaultProps = {params: {}};

function getComponentByName(name) {
  return componentList[name];
}

function parseProps(props) {
  if (!props) return props;

  const newProps = {...props};

  for (const key in newProps) {
    const obj = newProps[key];

    if (obj && Object.prototype.hasOwnProperty.call(obj, 'name')) newProps[key] = getComponentByName(obj.name);
  }

  return newProps;
} */
