module.exports = function deep_value(obj, key) {
  for (var i = 0, path = key.split('.'), len = path.length; i < len; i++) {
    obj = obj[path[i]];
    if (obj === undefined) {
      return undefined;
    }
  };
  return obj;
};
