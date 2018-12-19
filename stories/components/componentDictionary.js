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
