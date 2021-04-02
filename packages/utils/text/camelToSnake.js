module.exports = function camelToSnake(string) {
  return string.replace(/[\w]([A-Z])/g, (m) => `${m[0]}_${m[1]}`).toLowerCase();
};
