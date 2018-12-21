import React from 'react';
import {storiesOf} from '@storybook/react';

import ImplicitUi from '../src/ImplicitUi';
import * as compDictionary from '../src/components/T9nTestComponents';

import StorybookWrapper from './components/StorrybookWrapper';

const uiConfig1 = {
  t9nContext: 'test',
  children: [
    'SimpleTag',
    {
      t9nContext: 'level2',
      name: 'SimpleTag'
    }
  ]
};

const uiConfig2 = {
  t9nContext: 'test',
  children: [
    {
      t9nContext: 'level2',
      name: 'SimpleTag',
      props: {tagName: 'override$differentTag'}
    }
  ]
};

const t9n1 = {
  test$simpleTag: 'Translated Simple Tag',
  'test.level2$simpleTag': 'Translated Simple Tag level 2'
};

const t9n2 = {
  $simpleTag: 'Translated Simple Tag',
  level2$simpleTag: 'Translated Simple Tag level 2'
};

const t9n3 = {
  $simpleTag: 'Translated Simple Tag',
  override$differentTag: 'Overrided Translated Simple Tag'
};


storiesOf('T9n Examples', module)
  .add('should use full context and tagname as default if no translation exist', () => (
    <StorybookWrapper>
      <ImplicitUi components={compDictionary} showDefaultTag ui={uiConfig1} />
    </StorybookWrapper>
  ))
  .add('should use empty string if showDefaultTag is not set', () => (
    <StorybookWrapper>
      <ImplicitUi components={compDictionary} ui={uiConfig1} />
    </StorybookWrapper>
  ))
  .add('should use full contextTag if exists', () => (
    <StorybookWrapper>
      <ImplicitUi components={compDictionary} t9n={t9n1} ui={uiConfig1} />
    </StorybookWrapper>
  ))
  .add('should use fallback to lower context if full context does not exist', () => (
    <StorybookWrapper>
      <ImplicitUi components={compDictionary} t9n={t9n2} ui={uiConfig1} />
    </StorybookWrapper>
  ))
  .add('should use fallback al the way to the bare tag', () => (
    <StorybookWrapper>
      <ImplicitUi components={compDictionary} t9n={t9n3} ui={uiConfig1} />
    </StorybookWrapper>
  ))
  .add('should override tagname if tag prop is sent in', () => (
    <StorybookWrapper>
      <ImplicitUi components={compDictionary} t9n={t9n3} ui={uiConfig2} />
    </StorybookWrapper>
  ));
