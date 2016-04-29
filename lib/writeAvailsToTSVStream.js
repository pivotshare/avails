
var Avails = require('../lib/avails');

/**
 * Write Avails as TSV to a stream.
 *
 * @method  writeAvailsToTSVStream
 * @param   {Avail[]}         avails  -  Avails
 * @param   {stream.Writable} stream  -  Writable stream, e.g. process.stdout
 * @return  {Promise|Avail[]|Error}  Promise that stream will finish
 */
function writeAvailsToTSVStream(avails, writableStream) {
  return new Promise(function (resolve, reject) {
    avails.forEach(function (avail) {
      try {
        writableStream.write(Avails.toTSVLine(avail) + '\n');
      }
      catch (err) {
        reject(err);
      }
    })
    resolve(avails);
  })
}

module.exports = writeAvailsToTSVStream;
