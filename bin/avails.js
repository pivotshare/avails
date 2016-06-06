#!/usr/bin/env node

var packageJson = require('../package.json');

var program = require('commander');

program
  .version(packageJson.version)
  .description(packageJson.description)
  .command('convert', 'convert Avails between various formats', {
    isDefault: true
  })
  .parse(process.argv);
