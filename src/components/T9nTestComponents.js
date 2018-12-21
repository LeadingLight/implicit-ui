import React from 'react';

import {withT9n, withT9nFind} from '../T9n';

export function Paragraph({text}) {
  return <p>{text}</p>;
}

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

export const SimpleFindTag = withT9nFind(({findTag}) => <span>{findTag('$simpleTag', 'defaultTag')}</span>);
export const NoDefaultFindTag = withT9nFind(({findTag}) => <span>{findTag('$simpleTag')}</span>);
