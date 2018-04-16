import React from 'react';
import renderer from 'react-test-renderer';

import ImplicitUi from './ImplicitUi';
import * as compCollection from './components/T9nTestComponents';


describe('T9nContext', () => {
  it('should send in context as prop to ', () => {
    const uiConfig = {
      t9nContext: 'test',
      children: [
        'ShowContext'
      ]
    };

    const tree = renderer
      .create(<ImplicitUi components={compCollection} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should build context as a tree structure', () => {
    const uiConfig = {
      t9nContext: 'level1',
      children: [
        'ShowContext',
        {
          t9nContext: 'level2',
          name: 'ShowContext',
          children: [
            {
              t9nContext: 'level3',
              name: 'ShowContext'
            }
          ]
        }
      ]
    };

    const tree = renderer
      .create(<ImplicitUi components={compCollection} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
