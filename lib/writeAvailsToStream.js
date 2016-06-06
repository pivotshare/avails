
const writeAvailsToJSONStream = require('../lib/writeAvailsToJSONStream');
const writeAvailsToTSVStream = require('../lib/writeAvailsToTSVStream');
const writeAvailsToXLSXStream = require('../lib/writeAvailsToXLSXStream');

module.exports = function writeAvailsToStream(writableStream, outputType, avails) {
  /**
  Write Avails to a Stream
  @param   {WritableStream} writableStream
  @param   {String} outputType
  @param   {Avails} avails
  @return  {Promise|Avails|Error}
  */
  switch (outputType) {
    case 'tsv':
      return writeAvailsToTSVStream(avails, writableStream);
    case 'json':
      return writeAvailsToJSONStream(avails, writableStream);
    case 'xlsx':
      return writeAvailsToXLSXStream(avails, writableStream);
    default:
      return new Promise(function (resolve, reject) {
        reject(new Error('Unsupported output type: ' + outputType));
      })
  }
}