const express = require('express');
const path = require('path');

module.exports = function setup({ app }) {
  app.use('/assets', express.static(path.join(__dirname, 'public')));
}
