
var test = require('tape');
var fs = require('fs');

var getAvailsAltIDs = require('../../lib/getAvailsAltIDs');
var TV_AVAILS = require('../mock/tvs.json');
var MOVIE_AVAILS = require('../mock/movies.json');
var ALT_IDS = require('../mock/alt_ids.json');

test('getAvailAltIDs from TV Avails', function (t) {
  t.plan(1);
  var altIDs = getAvailsAltIDs(TV_AVAILS);
  t.deepEqual(altIDs, ALT_IDS);
});

test('getAvailAltIDs from Movie Avails', function (t) {
  t.plan(1);
  var altIDs = getAvailsAltIDs(MOVIE_AVAILS);
  t.deepEqual(altIDs, ['VIEW_MT_2006']);
});
