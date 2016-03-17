#!/usr/bin/env node
/*
 * Convert line of headers in TSV into JSON array
 */

var split = require('split');
var decamelize = require('decamelize');

process.stdin
  .pipe(split())
  .on('data', function (line) {
    if (!line) return;
    var arr = decamelizeArray(parseTSV(line));
    var json = JSON.stringify(arr, null, '  ');
    console.log(json);
  })
  .on('end', function () {
    process.exit(0); // we only need oneline
  })

function parseTSV (line) {
  return line.split('\t');
}

function decamelizeArray(arr) {
  return arr.map(function (i) {
    return decamelize(i);
  });
}
