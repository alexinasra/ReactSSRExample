const fs = require('fs');

module.exports = function saveJson(p, obj) {
  return new Promise(((resolve, reject) => {
    const jsonContent = JSON.stringify(obj, null, '\t');

    fs.writeFile(p, jsonContent, 'utf8', (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  }));
}
