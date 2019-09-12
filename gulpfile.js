const { watch, src, dest, series, parallel } = require('gulp');

function javascript(cb) {
  console.log('running javascript processes...');
  cb();
}

function css(cb) {
  console.log('running css processes...');
  cb();
}

function dev(cb) {
  cb();
}

function defaultTask(cb) {
  parallel(javascript, css);
  cb();
}

exports.dev = dev;
exports.default = defaultTask;
