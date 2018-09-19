import React from 'react';
import PropTypes from 'prop-types';

import {withT9n, withT9nFind} from '../T9n';

export function Paragraph({text}) {
  return <p>{text}</p>;
}

Paragraph.propTypes = {text: PropTypes.string.isRequired};

export function ShowContext({children, t9nContext}) {
  if (!children) return <span>{t9nContext}</span>;

  return (
    <div>
      <span>{t9nContext}</span>
      <div>
        {children}
      </div>
    </div>
  );
}

ShowContext.propTypes = {
  t9nContext: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

ShowContext.defaultProps = {children: undefined};

export const SimpleTag = withT9n(({tagName}) => <span>{tagName}</span>, {tagName: '$simpleTag'});

export function PropComponents({FirstComp, SecondComp}) {
  return (
    <div>
      <FirstComp />
      <SecondComp />
    </div>
  );
}

PropComponents.propTypes = {
  FirstComp: PropTypes.func.isRequired,
  SecondComp: PropTypes.func.isRequired
};

export const SimpleFindTag = withT9nFind(({findTag}) => <span>{findTag('$simpleTag', 'defaultTag')}</span>, {tagName: '$simpleTag'});
export const NoDefaultFindTag = withT9nFind(({findTag}) => <span>{findTag('$simpleTag')}</span>, {tagName: '$simpleTag'});
