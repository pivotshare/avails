//
// var XLSX = require('xlsx');
// var assert = require('assert');
// /*
//  * Data start on row 5
//  */
// var workbook = XLSX.readFile('doc/EMA-Avails_v1-6_Movies-TV.xlsx');
//
// var MOVIES = 'Movies';
// var TV = 'TV';
//
// // Sanity check
// assert(workbook.SheetNames[0] === MOVIES);
// assert(workbook.SheetNames[2] === TV);
//
// var movieSheet = workbook.Sheets[MOVIES];
// var tvSheet = workbook.Sheets[TV];
//
// /* Find desired cell */
// var desired_cell = tvSheet['A5'];
//
// /* Get the value */
// var desired_value = desired_cell.v;
//
// //console.log(desired_value);
//
// for (z in movieSheet) {
//   /* all keys that do not begin with "!" correspond to cell addresses */
//   if(z[0] === '!') continue;
//   console.log(z + "=" + JSON.stringify(movieSheet[z].w));
// }

var AVAILS_HEADERS_MOVIE = require('../schema/headers-movie.json');
var AVAILS_HEADERS_TV = require('../schema/headers-tv.json');

var Excel = require('exceljs');

var workbook = new Excel.Workbook();

workbook.xlsx
.readFile('doc/EMA-Avails_v1-6_Movies-TV.xlsx')
.then(function() {
    var Movies = workbook.getWorksheet('Movies');
    var TV = workbook.getWorksheet('TV');

    Movies.eachRow(function(row, rowNumber) {

      if (rowNumber < 5) return;
      //
      var row = [];
      for (var i = 1; i <= AVAILS_HEADERS_MOVIE.length; i++) {
        row.push(Movies.getRow(5).getCell(i).value)
      }

      console.log(row);
    });
});
