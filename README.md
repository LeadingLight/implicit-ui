# implicit-ui
Simple component for rendering a react ui from a json config object

Really early version DO NOT use.


### Basic example
Rendering a list of components

```javascript

import React from 'react';
import ReactDOM from 'react-dom';
import ImplicitUi from 'implicit-ui';

function MyParagraph() {
  return <p>This is my Paragraph</p>
}

const compDictionary = {MyParagraph};
const uiConf = [
  'MyParagraph',
  {name: 'MyParagraph'}
];

ReactDOM.render(
  <ImplicitUi components={compDictionary} ui={uiConf} />,
  document.getElementById('root'));

// will render -->
<p>This is my Paragraph</p>
<p>This is my Paragraph</p>

```

### Props in config
Rendering a list of components and setting props in configuration to components

```javascript

import React from 'react';
import ReactDOM from 'react-dom';
import ImplicitUi from 'implicit-ui';

function MyParagraph({text}) {
  return <p>{text}</p>
}

const compDictionary = {MyParagraph};
const uiConf = [
  {
    name: 'MyParagraph',
    props: {text: 'This is first paragraph'}
  },
  {
    name: 'MyParagraph',
    props: {text: 'This is secound paragraph'}
  }
];

ReactDOM.render(
  <ImplicitUi components={compDictionary} ui={uiConf} />,
  document.getElementById('root'));

// will render -->
<p>This is first paragraph</p>
<p>This is secound paragraph</p>

```
