
/**
 * Write Avails as JSON to a stream.
 *
 * @method  writeAvailsToTSVStream
 * @param   {Avail[]}         avails  -  Avails
 * @param   {stream.Writable} stream  -  Writable stream, e.g. process.stdout
 * @return  {Promise|Avail[]|Error}  Promise that stream will finish
 */
function writeAvailsToJSONStream(avails, writableStream) {
  return new Promise(function (resolve, reject) {
    try {
      writableStream.write(JSON.stringify(avails, null, '  '));
      resolve(avails);
    }
    catch (err) {
      reject(err);
    }
  })
}

module.exports = writeAvailsToJSONStream;
