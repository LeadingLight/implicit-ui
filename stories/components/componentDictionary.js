import React from 'react';

export function MyParagraph() {
  return <p>This is my Paragraph</p>;
}

export function MyTextParagraph({text}) {
  return <p>{text}</p>;
}

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

export function PropsContainer({Comp1, Comp2}) {
  return (
    <div>
      <Comp1 />
      <Comp2 />
    </div>
  );
}

export function Routes({children}) {
  return <div>{children}</div>;
}

export function Route({path, element}) {
  return (
    <div>
      <h3>{path}</h3>
      {element}
    </div>
  );
}

export function Content() {
  return <div>Content</div>;
}
