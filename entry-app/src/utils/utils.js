export const isPromise = func => (func instanceof Promise);

export const isFunction = func => Object.prototype.toString.call(func)=== '[object Function]';

export const isAsyncFunction = func => Object.prototype.toString.call(func)=== '[object AsyncFunction]';

export const recursiveLoop = (srcData, parentNode = null, loopLey, f = f => f) => {
  return srcData.map(item => {

    if (item.hasOwnProperty(loopLey)) {
      item[loopLey] = recursiveLoop(item[loopLey], item, loopLey, f);
    }

    return f(item, parentNode);
  });
};
