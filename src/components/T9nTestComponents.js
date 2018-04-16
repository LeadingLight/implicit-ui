import React from 'react';
import PropTypes from 'prop-types';

import {withT9n} from '../T9n';

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
