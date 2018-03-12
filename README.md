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
    props: {text: 'This is second paragraph'}
  }
];

ReactDOM.render(
  <ImplicitUi components={compDictionary} ui={uiConf} />,
  document.getElementById('root'));

// will render -->
<p>This is first paragraph</p>
<p>This is second paragraph</p>

```

### Children in config
Rendering a tree of components by setting children in configuration to components
```javascript

import React from 'react';
import ReactDOM from 'react-dom';
import ImplicitUi from 'implicit-ui';

export function Container({children, text}) {
  return (
    <div>
      <h3>{text}</h3>
      <div>
        {children}
      </div>
    </div>
  );
}

function MyParagraph({text}) {
  return <p>{text}</p>
}

const compDictionary = {Container, MyParagraph};
const uiConf = [
  {
    name: 'Container',
    props: {text: 'Header for my paragraphs'},
    children: [
      {
        name: 'MyParagraph',
        props: {text: 'This is first paragraph'}
      },
      {
        name: 'MyParagraph',
        props: {text: 'This is second paragraph'}
      }
    ]
  }
];

ReactDOM.render(
  <ImplicitUi components={compDictionary} ui={uiConf} />,
  document.getElementById('root'));

// will render -->
<div>
  <h3>Header for my paragraphs</h3>
  <div>
    <p>This is first paragraph</p>
    <p>This is second paragraph</p>
  </div>
</div>

```

### Components in props
Making it possible to send in an component as a prop and having it render from components list.


```javascript

import React from 'react';
import ReactDOM from 'react-dom';
import ImplicitUi from 'implicit-ui';

export function PropsContainer({Comp1, Comp2}) {
  return (
    <div>
      <Comp1 />
      <Comp2 />
    </div>
  );
}

function MyParagraph({text}) {
  return <p>{text}</p>
}

const compDictionary = {PropsContainer, MyParagraph};
const uiConf = [
  {
    name: 'PropsContainer',
    props: {
      Comp1: {
        name: 'MyParagraph',
        props: {text: 'This is first paragraph'}
      },
      Comp2: {
        name: 'MyParagraph',
        props: {text: 'This is second paragraph'}
      }
    }
  }
];

ReactDOM.render(
  <ImplicitUi components={compDictionary} ui={uiConf} />,
  document.getElementById('root'));

// will render -->
<div>
  <p>This is first paragraph</p>
  <p>This is second paragraph</p>
</div>

```
