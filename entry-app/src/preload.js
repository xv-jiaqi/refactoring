const container = document.createElement("div");

// this will prevent scrollbars in the container
// container.style.overflow = "hidden";

// this ensures the container is always in the visible area
// sometimes browser don't load what's out of the viewscope so this would help against that
container.style.position = "fixed";
container.style.zIndex = "10000";
container.style.top = '50vh';
container.style.left = '0';
container.style.border = '1px red solid';
container.style.width = '1px';
container.style.height = '1px';

// // this will turn the container "click through"
// container.style.pointerEvents = "none";
//
// // this will render the div invisible:
container.style.opacity = 0;
//
// // this will try to put the container behind the <body> element:
// container.style.zIndex = -1;
//
// // this will remove any performance loss when scrolling:
// container.style.willChange = "transform";

document.body.appendChild(container);

const framePreload = function (url) {
  const frame = document.createElement("iframe");
  frame.src = url;
  container.appendChild(frame);
  return frame;
};

import Vue from 'vue';

setTimeout(() => {
  console.log('---')

  const frame = framePreload('http://localhost:17081/colgate.html');

  Vue.prototype.frame = frame;
});


