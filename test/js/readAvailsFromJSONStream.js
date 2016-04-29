
var test = require('tape');
var fs = require('fs');
var readAvailsFromJSONStream = require('../../lib/readAvailsFromJSONStream');

var TV_AVAILS = require('../mock/tvs.json');

test('readAvailsFromJSONStream', function (t) {
  t.plan(1);

  var stream = fs.createReadStream('test/mock/tvs.json');

  readAvailsFromJSONStream(stream).then(function (avails) {
    t.deepEqual(avails, TV_AVAILS);
  })
});
