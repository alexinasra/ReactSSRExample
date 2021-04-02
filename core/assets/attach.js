const express = require('express');
const path = require('path');

module.exports = function attach({ app }) {
  app.use('/assets', express.static(path.join(__dirname, 'public')));
}
