
var split = require('split');
var Avails = require('../lib/avails');

/**
 * Read Avails TSV file from a Stream.
 *
 * @method  readAvailsFromTSVStream
 * @param   {stream.Readable}  stream  - Readable Stream of TSV data, e.g. process.stdin
 * @return  {Promise|Avail[]|Error}  Promise of Avails array
 */
function readAvailsFromTSVStream(readableStream) {
  return new Promise(function (resolve, reject) {
    var avails = [];
    readableStream
      .pipe(split())
      .on('data', function (line) {
        if (!line) return;
        avails.push(Avails.fromTSVLine(line));
      })
      .on('end', function () {
        resolve(avails);
      })
      .on('error', function (err) {
        reject(err)
      })
  })
}

module.exports = readAvailsFromTSVStream;
