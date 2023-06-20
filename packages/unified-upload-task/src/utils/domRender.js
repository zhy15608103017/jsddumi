import React from "react";
import ReactDOM from 'react-dom';

/**
 * ReactDOM 不推荐直接向 document.body mount 元素
 * 当 node 不存在时，创建一个 div
 */
function domRender(reactElem, node) {
  let div;
  if (node) {
    div = typeof node === 'string'
      ? window.document.getElementById(node)
      : node;
  } else {
    div = window.document.createElement('div');
    window.document.body.appendChild(div);
  }
  return ReactDOM.render(reactElem, div);
}

export default domRender;
