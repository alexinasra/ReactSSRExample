

module.exports = function deletePropertyPath(origin, path) {
  let obj = origin;
  const parent = obj;
  if (!obj || !path) {
    return;
  }

  path = path.split('.');

  for (let i = 0; i < path.length - 1; i++) {
    const parent = obj;
    obj = obj[path[i]];
    if (typeof obj === 'undefined') {
      return;
    }
  }

  delete obj[path.pop()];
  if (Object.keys(obj).length === 0) {
    return delete parent[path.pop()];
  }
};
