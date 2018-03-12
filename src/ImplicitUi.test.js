import React from 'react';
import renderer from 'react-test-renderer';

import ImplicitUi from './ImplicitUi';
import * as compCollection from './components/TestComponents';


describe('ImplicitUi', () => {
  it('should use strings as component name', () => {
    const uiConfig = [
      'MyTitle'
    ];

    const tree = renderer
      .create(<ImplicitUi components={compCollection} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should use name prop as component name', () => {
    const uiConfig = [
      {name: 'MyTitle'}
    ];

    const tree = renderer
      .create(<ImplicitUi components={compCollection} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render list of components', () => {
    const uiConfig = [
      'MyTitle',
      'MyTitle'
    ];

    const tree = renderer
      .create(<ImplicitUi components={compCollection} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should pass prop property as props to component', () => {
    const uiConfig = [
      {
        name: 'Paragraph',
        props: {text: 'This is my text'}
      }
    ];

    const tree = renderer
      .create(<ImplicitUi components={compCollection} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render children prop as children to component', () => {
    const uiConfig = [
      {
        name: 'Container',
        props: {text: 'MyHeader'},
        children: [
          'MyTitle',
          'MyTitle'
        ]
      }
    ];

    const tree = renderer
      .create(<ImplicitUi components={compCollection} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render props that is object and has a name in component list as component', () => {
    const uiConfig = [
      {
        name: 'PropsContainer',
        props: {
          Comp1: {name: 'MyTitle'},
          Comp2: {name: 'MyTitle'}
        }
      }
    ];

    const tree = renderer
      .create(<ImplicitUi components={compCollection} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render prop components with their own props', () => {
    const uiConfig = [
      {
        name: 'PropsContainer',
        props: {
          Comp1: {
            name: 'Paragraph',
            props: {text: 'Paragraph 1'}
          },
          Comp2: {
            name: 'Paragraph',
            props: {text: 'Paragraph 2'}
          }
        }
      }
    ];

    const tree = renderer
      .create(<ImplicitUi components={compCollection} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render prop components with their own children', () => {
    const uiConfig = [
      {
        name: 'PropsContainer',
        props: {
          Comp1: {
            name: 'Container',
            props: {text: 'Header 1'},
            children: [
              {
                name: 'Paragraph',
                props: {text: 'Paragraph 1'}
              },
              {
                name: 'Paragraph',
                props: {text: 'Paragraph 2'}
              }
            ]
          },
          Comp2: {
            name: 'Paragraph',
            props: {text: 'Paragraph 3'}
          }
        }
      }
    ];

    const tree = renderer
      .create(<ImplicitUi components={compCollection} ui={uiConfig} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
