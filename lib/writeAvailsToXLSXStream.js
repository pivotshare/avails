
var AVAILS_HEADERS_MOVIE = require('../schema/headers-movie.json');
var AVAILS_HEADERS_TV = require('../schema/headers-tv.json');

var Excel = require('exceljs');
var Avails = require('../lib/avails');
var superUpperCamelCaseArray = require('../lib/superUpperCamelCaseArray');

/**
 * Write Avails as an Excel spreadsheet to a stream.
 *
 * @method  writeAvailsToXLSXStream
 * @param   {Avail[]}         avails  -  Avails
 * @param   {stream.Writable} stream  -  Writable stream, e.g. process.stdout
 * @return  {Promise|Avail[]|Error}  Promise that stream will finish
 */
function writeAvailsToXLSXStream(avails, stream) {

  // create workbook and sheets
  var workbook = new Excel.Workbook();
  var tvSheet = workbook.addWorksheet('TV');
  var movieSheet = workbook.addWorksheet('Movies');

  // Add headers to each sheet
  tvSheet.addRow(superUpperCamelCaseArray(AVAILS_HEADERS_TV))
  movieSheet.addRow(superUpperCamelCaseArray(AVAILS_HEADERS_MOVIE))

  // place each avail into appropriate sheet
  avails.forEach(function (avail) {
    switch (avail.work_type) {
      case 'Season':
      case 'Episode':
        tvSheet.addRow(Avails.toArray(avail));
        break;
      case 'Movie':
        movieSheet.addRow(Avails.toArray(avail));
        break;
      default:
        throw new Error('Unsupported WorkType: ' + avail.work_type);
    }
  });

  return workbook.xlsx.write(stream).then(function () {
    return avails;
  });
}

module.exports = writeAvailsToXLSXStream;
