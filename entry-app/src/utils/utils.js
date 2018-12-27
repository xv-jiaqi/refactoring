export const isPromise = func => (func instanceof Promise);

export const isFunction = func => Object.prototype.toString.call(func)=== '[object Function]';

export const isAsyncFunction = func => Object.prototype.toString.call(func)=== '[object AsyncFunction]';
