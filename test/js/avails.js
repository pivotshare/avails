
var test = require('tape');
var Avails = require('../../lib/avails.js');

var fs = require('fs');

test('Avails.fromTSVLine', function (t) {
  t.plan(1);

  var str = fs.readFileSync('./test/mock/movie.tsv', 'utf8').toString();
  var expected = JSON.parse(fs.readFileSync('./test/mock/movie.json').toString());

  var actual = Avails.fromTSVLine(str);

  t.deepEqual(actual, expected);
});

test('Avails.toTSVLine', function (t) {
  t.plan(1);


  var obj = JSON.parse(fs.readFileSync('./test/mock/movie.json').toString());
  var expected = fs.readFileSync('./test/mock/movie.tsv', 'utf8').toString();
  var actual = Avails.toTSVLine(obj);
  actual += '\n'; // HACK: add trailing newline

  t.deepEqual(actual, expected);
});
