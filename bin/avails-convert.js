#!/usr/bin/env node

var Avails = require('../lib/avails');
var packageJson = require('../package.json');

// Readers
var readAvailsFromJSONStream = require('../lib/readAvailsFromJSONStream');
var readAvailsFromTSVStream = require('../lib/readAvailsFromTSVStream');
var readAvailsFromXLSXStream = require('../lib/readAvailsFromXLSXStream');

// Writers
var writeAvailsToJSONStream = require('../lib/writeAvailsToJSONStream');
var writeAvailsToTSVStream = require('../lib/writeAvailsToTSVStream');
var writeAvailsToXLSXStream = require('../lib/writeAvailsToXLSXStream');

var program = require('commander');

program
  .description('Convert between different Avails formats')
  .usage('[options] <infile')
  .option('-i, --input [type]', 'Add the specified type of input [tsv|json|xlsx] (required)')
  .option('-o, --output [type]', 'Add the specified type of output [tsv|json|xlsx] (required)')
  .parse(process.argv);

if (!program.input || !program.output) {
  program.outputHelp();
  process.exit(1);
}

//
// TODO: proper transform should look something like this:
//
// var transform = new AvailsTransform(input, output);
// process.stdin
//   .pipe(transform)
//   .pipe(process.stdout)
//
// I followed the lead/restriction of ExcelJS writer/reader
//

// main
readAvailsFromStream(process.stdin, program.input)
  .then(function (avails) {
    return writeAvailsToStream(process.stdout, program.output, avails);
  })
  .then(null, function (err) {
    console.error(err.message);
    process.exit(1);
  })

/**
 *
 *
 */
function readAvailsFromStream (readableStream, input) {
  switch (input) {
    case 'tsv':
      return readAvailsFromTSVStream(readableStream);
    case 'json':
      return readAvailsFromJSONStream(readableStream);
    case 'xlsx':
      return readAvailsFromXLSXStream(readableStream);
    default:
      return new Promise(function (resolve, reject) {
        reject(new Error('Unsupported input type: ' + input));
      })
  }
}

/**
 *
 *
 */
function writeAvailsToStream(writableStream, output, avails) {
  switch (output) {
    case 'tsv':
      return writeAvailsToTSVStream(avails, writableStream);
    case 'json':
      return writeAvailsToJSONStream(avails, writableStream);
    case 'xlsx':
      return writeAvailsToXLSXStream(avails, writableStream);
    default:
      return new Promise(function (resolve, reject) {
        reject(new Error('Unsupported output type: ' + output));
      })
  }
}
