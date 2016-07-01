import React from 'react'
import { renderToStaticMarkup }  from 'react-dom/server'

function element(tagName, includeStyles = false) {
  return function (props) {
    let attributes = {
      ...props.attrs,
      dangerouslySetInnerHTML: { __html: props.content }
    };

    if (includeStyles) {
      Object.assign(attributes, { style: props.style });
    }

    return renderToStaticMarkup(React.createElement(tagName, attributes));
  };
}

const h1 = element('h1');
const h2 = element('h2');
const h3 = element('h3');
const h4 = element('h4');
const h5 = element('h5');
const h6 = element('h6');
const p = element('p');
const span = element('span', true);
const a = element('a');

export {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  a
}
