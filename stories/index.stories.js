import React from 'react';
import {storiesOf} from '@storybook/react';

import ImplicitUi from '../src/ImplicitUi';

import StorybookWrapper from './components/StorrybookWrapper';
import * as compDictionary from './components/componentDictionary';

storiesOf('Basic Examples', module)
  .add('use configuration array', () => (
    <StorybookWrapper>
      <ImplicitUi
        components={compDictionary}
        ui={[
          'MyParagraph',
          {name: 'MyParagraph'}
        ]} />
    </StorybookWrapper>
  ))
  .add('use props in config', () => (
    <StorybookWrapper>
      <ImplicitUi
        components={compDictionary}
        ui={[
          {
            name: 'MyTextParagraph',
            props: {text: 'This is first paragraph'}
          },
          {
            name: 'MyTextParagraph',
            props: {text: 'This is second paragraph'}
          }
        ]} />
    </StorybookWrapper>
  ))
  .add('use children in config', () => (
    <StorybookWrapper>
      <ImplicitUi
        components={compDictionary}
        ui={[
          {
            name: 'Container',
            props: {text: 'Header for my paragraphs'},
            children: [
              {
                name: 'MyTextParagraph',
                props: {text: 'This is first paragraph'}
              },
              {
                name: 'MyTextParagraph',
                props: {text: 'This is second paragraph'}
              }
            ]
          }
        ]} />
    </StorybookWrapper>
  ))
  .add('use component in props', () => (
    <StorybookWrapper>
      <ImplicitUi
        components={compDictionary}
        ui={[
          {
            name: 'PropsContainer',
            props: {
              Comp1: {
                name: 'MyTextParagraph',
                props: {text: 'This is first paragraph'}
              },
              Comp2: {
                name: 'MyTextParagraph',
                props: {text: 'This is second paragraph'}
              }
            }
          }
        ]} />
    </StorybookWrapper>
  ));
