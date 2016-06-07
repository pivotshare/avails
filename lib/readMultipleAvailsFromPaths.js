
const readAvailsFromStream = require('../lib/readAvailsFromStream');
const fs = require('fs');

module.exports = function readMultipleAvailsFromPaths(paths, inputType) {
  /**
  Read multiple Avails using filepaths
  @param  {String[]} paths - Array of filepaths
  @param  {String} inputType
  @param  {Promise|Avails[]|Error}
  */
  return Promise.all(paths && paths.map(function (path) {
    return readAvailsFromStream(fs.createReadStream(path, 'utf8'), inputType)
  }))
}