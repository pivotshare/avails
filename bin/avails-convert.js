#!/usr/bin/env node

var Avails = require('../lib/avails');
var packageJson = require('../package.json');

const readAvailsFromStream = require('../lib/readAvailsFromStream');
const writeAvailsToStream = require('../lib/writeAvailsToStream');

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
