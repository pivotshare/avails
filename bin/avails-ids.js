#!/usr/bin/env node

var packageJson = require('../package.json');

var readAvailsFromStream = require('../lib/readAvailsFromStream');
var getAvailsAltIDs = require('../lib/getAvailsAltIDs');

var program = require('commander');

program
  .description('Output list of Alt IDs from Avails')
  .usage('[options] <infile')
  .option('-i, --input [type]', 'Add the specified type of input [tsv|json|xlsx] (required)')
  .option('-o, --output [type]', 'Add the specified type of output [tsv|json] (required)')
  .parse(process.argv);

if (!program.input || !program.output) {
  program.outputHelp();
  process.exit(1);
}

// main
readAvailsFromStream(process.stdin, program.input)
  .then(function (avails) {
    var altIDs = getAvailsAltIDs(avails);
    switch (program.output) {
      case 'tsv':
        // NOTE: technically still TSV since only one field
        return altIDs.join('\n');
      case 'json':
        return JSON.stringify(altIDs, null, '  ');
      default:
        throw new Error('Unsupported output type: ' + program.output)
    }
  })
  .then(console.log)
  .then(null, function (err) {
    console.error(err.message);
    process.exit(1);
  })
