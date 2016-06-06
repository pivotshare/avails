
const readAvailsFromJSONStream = require('../lib/readAvailsFromJSONStream');
const readAvailsFromTSVStream = require('../lib/readAvailsFromTSVStream');
const readAvailsFromXLSXStream = require('../lib/readAvailsFromXLSXStream');

module.exports = function readAvailsFromStream (readableStream, inputType) {
  /**
  Read Avails from a Stream
  @param   {ReadableStream} readableStream
  @param   {String} inputType
  @return  {Promise|Avails|Error}
  */
  switch (inputType) {
    case 'tsv':
      return readAvailsFromTSVStream(readableStream);
    case 'json':
      return readAvailsFromJSONStream(readableStream);
    case 'xlsx':
      return readAvailsFromXLSXStream(readableStream);
    default:
      return new Promise(function (resolve, reject) {
        reject(new Error('Unsupported input type: ' + inputType));
      })
  }
}