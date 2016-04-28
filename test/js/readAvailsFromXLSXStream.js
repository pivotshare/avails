
var test = require('tape');
var fs = require('fs');
var readAvailsFromXLSXStream = require('../../lib/readAvailsFromXLSXStream');

var TV_AVAILS = require('../mock/tvs.json');

test('readAvailsFromXLSXStream', function (t) {
  t.plan(1);

  var stream = fs.createReadStream('test/mock/tvs.xlsx');

  readAvailsFromXLSXStream(stream).then(function (avails) {
    t.deepEqual(avails[0], TV_AVAILS[0]);
  })
});
