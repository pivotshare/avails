
var AVAILS_HEADERS_MOVIE = require('../schema/headers-movie.json');
var AVAILS_HEADERS_TV = require('../schema/headers-tv.json');

var Excel = require('exceljs');
var Avails = require('../lib/avails');

/**
 * Parse an ExcelJS row into an Avail object
 *
 * @method  parseExcelJSRow
 * @param   {ExcelJSRow}  row  -  ExcelJS Row
 * @return  {Avail}  Avail Obect
 * @throws  {Error}  if WorkType is unknown
 */
function parseExcelJSRow(row) {

  // determine schema to use based on WorkType (Column 4)
  var schema = (function (type) {
    switch (type) {
      case 'Season':
      case 'Episode':
        return AVAILS_HEADERS_TV;
      case 'Movie':
        return AVAILS_HEADERS_MOVIE;
      default:
        throw new Error('Unknown WorkType: ' + type)
    }
  }(row.getCell(4).value));

  // generate Avail as array
  return Avails.fromArray(schema.map(function (v, i) {
    var value = row.getCell(i + 1).value;
    // FIXME: Need to scrub this value further due to ExcelJS 'over' coercion
    // e.g. Date object
    if (typeof value === 'undefined' || value === null) {
      value = '';
    }
    return value;
  }));
}

/**
 * Read Avails XLSX file from a Stream.
 *
 * @method  readAvailsFromXLSXStream
 * @param   {stream.Readable}  stream  - Readable Stream of XLXS data, e.g. process.stdin
 * @return  {Promise|Avail[]|Error}  Promise of Avails array
 */
function readAvailsFromXLSXStream(stream) {
  return new Excel.Workbook().xlsx
  .read(stream)
  .then(function (workbook) {

    // get Excel worksheets
    var sheets = ['Movies', 'TV'].map(function (sheetName) {
      return workbook.getWorksheet(sheetName);
    })

    // parse rows from each sheet to Avails
    var avails = [];
    sheets.forEach(function (sheet) {
      sheet.eachRow(function(row, rowNumber) {
        var v = row.getCell(1).value;

        // Skip headers and comments
        if (/^Avail/.test(v)) return;
        if (/^DisplayName/.test(v)) return;
        if (/^\/\//.test(v)) return;

        // Avail as object
        avails.push(parseExcelJSRow(row));
      });
    })

    return avails;
  })
}

module.exports = readAvailsFromXLSXStream;
