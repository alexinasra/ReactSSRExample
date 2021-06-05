
module.exports = function deepValueUpdate(obj, key, value) {
  for (let i = 0, path = key.split('.'), len = path.length; i < len; i++) {
    obj[path[i]] = (i >= path.length - 1) ? value : (obj[path[i]] || {});
    obj = obj[path[i]];
  }
  return obj;
};
