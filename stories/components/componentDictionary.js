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

export function Router({children}) {
  return (
    <div style={{padding: '1em', border: '1px solid #f00'}}>
      <h3>Router</h3>
      {children}
    </div>
  );
}

export function SideMenu({config}) {
  return (
    <div style={{padding: '1em', border: '1px solid #0f0'}}>
      <h3>SideMenu</h3>
      <ul>
        {config.map((item, index) => (
          <li key={index}>
            <p>
              {item.link}:
              <br />
              {item.title} - {item.icon}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Routes({children}) {
  return (
    <div style={{padding: '1em', border: '1px solid #0ff'}}>
      <h3>Routes</h3>
      {children}
    </div>
  );
}

export function Route({path, element, children}) {
  return (
    <div style={{padding: '1em', border: '1px solid #00f'}}>
      <h2>Route</h2>
      <p>Path:</p>
      <h3>{path}</h3>
      {element}
      <p>Children:</p>
      {children}
    </div>
  );
}

export function StyledContainer({children, text}) {
  return (
    <div style={{padding: '1em', border: '1px solid #f0f'}}>
      <h3>{text}</h3>
      <div>{children}</div>
    </div>
  );
}

export function Content() {
  return <div>Content</div>;
}
