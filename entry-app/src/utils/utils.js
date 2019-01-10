export const isPromise = func => (func instanceof Promise);

export const isFunction = func => Object.prototype.toString.call(func) === '[object Function]';

export const isAsyncFunction = func => Object.prototype.toString.call(func) === '[object AsyncFunction]';

/**
 * Tree node traversal
 * @param srcData
 * @param nodeName
 * @param f
 * @param parentNode
 * @returns {*}
 */
export const treeTraversal = (srcData, nodeName, f = f => f, parentNode = null) => {
  return srcData.map(item => {

    if (item.hasOwnProperty(nodeName)) {
      item[nodeName] = treeTraversal(item[nodeName], nodeName, f, item);
    }

    return f(item, parentNode);
  });
};

/**
 * Tree Outer Traversal
 * @param srcData
 * @param nodeName
 * @param f
 * @param childNode
 */
export const treeOuterTraversal = (srcData, nodeName, f = f => f, childNode = null) => {
  f(srcData, srcData);

  if (srcData[nodeName]) {
    return treeOuterTraversal(srcData[nodeName], nodeName, f, childNode);
  }

  return srcData;
};
