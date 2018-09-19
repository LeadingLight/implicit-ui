import React from 'react';
import renderer from 'react-test-renderer';

import ImplicitUi from './ImplicitUi';
import * as compCollection from './components/T9nTestComponents';

const uiConfig = {
  t9nContext: 'test',
  children: [
    'SimpleTag',
    {
      t9nContext: 'level2',
      name: 'SimpleTag'
    }
  ]
};

describe('T9n', () => {
  it('should use full context and tagname as default if no translation exist', () => {
    const tree = renderer
      .create(<ImplicitUi components={compCollection} showDefaultTag ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should use empty string if showDefaultTag is not set', () => {
    const tree = renderer
      .create(<ImplicitUi components={compCollection} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should use full contextTag if exists', () => {
    const t9n = {
      test$simpleTag: 'Translated Simple Tag',
      'test.level2$simpleTag': 'Translated Simple Tag level 2'
    };
    const tree = renderer
      .create(<ImplicitUi components={compCollection} t9n={t9n} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should use fallback to lower context if full context does not exist', () => {
    const t9n = {
      $simpleTag: 'Translated Simple Tag',
      level2$simpleTag: 'Translated Simple Tag level 2'
    };
    const tree = renderer
      .create(<ImplicitUi components={compCollection} t9n={t9n} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should use fallback al the way to the bare tag', () => {
    const t9n = {$simpleTag: 'Translated Simple Tag'};
    const tree = renderer
      .create(<ImplicitUi components={compCollection} t9n={t9n} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should override tagname if tag prop is sent in', () => {
    const uiConfigOveride = {
      t9nContext: 'test',
      children: [
        {
          t9nContext: 'level2',
          name: 'SimpleTag',
          props: {tagName: 'override$differentTag'}
        }
      ]
    };
    const t9n = {$simpleTag: 'Translated Simple Tag'};
    const tree = renderer
      .create(<ImplicitUi components={compCollection} showDefaultTag t9n={t9n} ui={uiConfigOveride} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
