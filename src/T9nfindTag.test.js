import React from 'react';
import renderer from 'react-test-renderer';

import ImplicitUi from './ImplicitUi';
import * as compCollection from './components/T9nTestComponents';

const uiConfig = {
  t9nContext: 'test',
  children: [
    {name: 'SimpleFindTag'}
  ]
};

const uiNoDefaultConfig = {
  t9nContext: 'test',
  children: [
    {name: 'NoDefaultFindTag'}
  ]
};

describe('T9n findTag Coponents', () => {
  it('should use defaultTag if sett in function', () => {
    const tree = renderer
      .create(<ImplicitUi components={compCollection} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should lookup correct tag in component', () => {
    const t9n = {$simpleTag: 'Translated FindTag'};
    const tree = renderer
      .create(<ImplicitUi components={compCollection} t9n={t9n} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should use empty string if no default provided from component', () => {
    const tree = renderer
      .create(<ImplicitUi components={compCollection} ui={uiNoDefaultConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should use fullContextTag as default if showDefaultTag is set and no default provided from component', () => {
    const tree = renderer
      .create(<ImplicitUi components={compCollection} showDefaultTag ui={uiNoDefaultConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
