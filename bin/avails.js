#!/usr/bin/env node

var Avails = require('../lib/avails');
var packageJson = require('../package.json');
var writeAvailsToXLSXStream = require('../lib/writeAvailsToXLSXStream');
var readAvailsFromXLSXStream = require('../lib/readAvailsFromXLSXStream');

var program = require('commander');
var split = require('split');
var JSONStream = require('JSONStream')

program
  .version(packageJson.version)
  .description(packageJson.description)
  .usage('[options] <infile')
  .option('-i, --input [type]', 'Add the specified type of input [tsv|json] (required)')
  .option('-o, --output [type]', 'Add the specified type of output [tsv|json|js|xlsx] (required)')
  .parse(process.argv);

if (!program.input || !program.output) {
  program.outputHelp();
  process.exit(1);
}

switch (program.input) {
  case 'tsv':
    inputTSV(process.stdin);
    break;
  case 'json':
    inputJSON(process.stdin);
    break;
  case 'xlsx':
    readAvailsFromXLSXStream(process.stdin)
      .then(function (avails) {
        output(avails);
      })
      .then(null, function (err) {
        console.error(err)
        process.exit(1);
      })
    break;
  default:
    console.error('Unsupported input type: ' + program.input);
    process.exit(1);
}

//
// INPUT
//

/*
 * TSV can be streamed in
 */
function inputTSV (stream) {
  var avails = [];
  stream
    .pipe(split())
    .on('data', function (line) {
      if (!line) return;
      avails.push(Avails.fromTSVLine(line));
    })
    .on('end', function () {
      output(avails);
    })
}

/*
 * TSV can be streamed in
 */
function inputJSON (stream) {
  var avails;
  // FIXME: I don't think I'm using this correctly
  stream
    .pipe(JSONStream.parse())
    .on('data', function (line) {
      if (!line) return;
      avails = line;
    })
    .on('end', function () {
      output(avails);
    })
}

//
// OUTPUT
//

function output(avails) {
  switch (program.output) {
    case 'tsv':
      outputTSV(avails);
      break;
    case 'json':
      outputJSON(avails);
      break;
    case 'js':
      outputJS(avails);
      break;
    case 'xlsx':
      writeAvailsToXLSXStream(avails, process.stdout);
      break;
    default:
      console.error('Unsupported output type: ' + program.output);
      process.exit(1);
  }
}

function outputJSON(avails) {
  var json;
  try {
    json = JSON.stringify(avails, null, '  ');
  }
  catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  console.log(json);
}

function outputJS(avails) {
  console.log(avails);
}

function outputTSV(avails) {
  var tsv;
  avails.forEach(function (avail) {
    try {
      console.log(Avails.toTSVLine(avail));
    }
    catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  })
}
