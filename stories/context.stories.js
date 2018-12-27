import React from 'react';
import {storiesOf} from '@storybook/react';

import ImplicitUi from '../src/ImplicitUi';
import * as t9nCompDictionary from '../src/components/T9nTestComponents';
import * as regularCompDictionary from '../src/components/TestComponents';

import StorybookWrapper from './components/StorrybookWrapper';

const compDictionary = {
  ...t9nCompDictionary,
  ...regularCompDictionary
};

console.log(compDictionary);

const T9nContextContext = React.createContext();

const T9nContextProvider = T9nContextContext.Provider;
const T9nContextConsumer = T9nContextContext.Consumer;

function T9nContext({contextName, children}) {
  return (
    <T9nContextConsumer>
      {(parentContext) => (
        <T9nContextProvider value={parentContext ? `${parentContext}.${contextName}` : contextName}>
          {children}
        </T9nContextProvider>
      )}
    </T9nContextConsumer>
  );
}


storiesOf('Context', module)
  .add('Simple', () => (
    <T9nContextProvider value="inside">
      <T9nContext contextName="page2">
        <T9nContextConsumer>
          {(context) => <div>{context}</div>}
        </T9nContextConsumer>
      </T9nContext>
      <T9nContext contextName="page2">
        <T9nContext contextName="container1">
          <T9nContextConsumer>
            {(context) => <div>{context}</div>}
          </T9nContextConsumer>
        </T9nContext>
      </T9nContext>
    </T9nContextProvider>
  ))
  .add('should add context to props components', () => (
    <StorybookWrapper>
      <ImplicitUi
        components={compDictionary}
        showDefaultTag
        t9n={{}}
        ui={[
          {
            name: 'PropsContainer',
            props: {
              Comp1: {
                t9nContext: 'comp1',
                name: 'SimpleTag'
              },
              Comp2: {
                t9nContext: 'comp2',
                name: 'SimpleTag'
              }
            }
          }
        ]} />
    </StorybookWrapper>
  ));
