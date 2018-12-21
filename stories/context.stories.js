import React from 'react';
import {storiesOf} from '@storybook/react';


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
  ));
