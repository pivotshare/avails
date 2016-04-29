
var test = require('tape');
var fs = require('fs');
var readAvailsFromTSVStream = require('../../lib/readAvailsFromTSVStream');

var TV_AVAILS = require('../mock/tvs.json');

test('readAvailsFromTVSStream', function (t) {
  t.plan(1);

  var stream = fs.createReadStream('test/mock/tvs.tsv');

  readAvailsFromTSVStream(stream).then(function (avails) {
    t.deepEqual(avails, TV_AVAILS);
  })
});
