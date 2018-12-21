import React from 'react';
import renderer from 'react-test-renderer';

import ImplicitUi from './ImplicitUi';
import * as compCollection from './components/T9nTestComponents';


/*
  Todo:
  These tests are outdated since t9nContext is now passed using context and not props
  test suit needs to be removed or rebilt with valid test
*/

describe('T9nContext', () => {
  xit('should send in context as prop to ', () => {
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

  xit('should build context as a tree structure', () => {
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

  xit('transfer context to prop elements', () => {
    const uiConfig = {
      t9nContext: 'base',
      children: [
        'ShowContext',
        {
          t9nContext: 'level2',
          name: 'PropComponents',
          props: {
            FirstComp: {
              t9nContext: 'level3',
              name: 'ShowContext'
            },
            SecondComp: {name: 'ShowContext'}
          }
        }
      ]
    };

    const tree = renderer
      .create(<ImplicitUi components={compCollection} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
