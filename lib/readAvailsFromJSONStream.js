
var JSONStream = require('JSONStream');

/**
 * Read Avails JSON file from a Stream.
 *
 * @method  readAvailsFromJSONStream
 * @param   {stream.Readable}  stream  - Readable Stream of JSON data, e.g. process.stdin
 * @return  {Promise|Avail[]|Error}  Promise of Avails array
 */
function readAvailsFromJSONStream(readableStream) {
  return new Promise(function (resolve, reject) {
    var avails = [];
    readableStream
      .pipe(JSONStream.parse())
      .on('data', function (line) {
        if (!line) return;
        avails = line;
      })
      .on('end', function () {
        resolve(avails);
      })
  })
}

module.exports = readAvailsFromJSONStream;
