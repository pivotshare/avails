
const test = require('tape');
const fs = require('fs');
const areAvailAltIDsEqual = require('../../lib/areAvailAltIDsEqual');

test('areAvailAltIDsEqual', function (t) {
  t.plan(6);

  t.ok(areAvailAltIDsEqual({
    work_type: 'Season',
    season_alt_id: 'S01'
  }, {
    work_type: 'Season',
    season_alt_id: 'S01'
  }));

  t.notOk(areAvailAltIDsEqual({
    work_type: 'Season',
    season_alt_id: 'S01'
  }, {
    work_type: 'Season',
    season_alt_id: 'S02'
  }));

  // missing episode_alt_id
  t.notOk(areAvailAltIDsEqual({
    work_type: 'Season',
    season_alt_id: 'S01'
  }, {
    work_type: 'Episode',
    season_alt_id: 'S01'
  }));

  t.ok(areAvailAltIDsEqual({
    work_type: 'Episode',
    season_alt_id: 'S01',
    episode_alt_id: 'E01'
  }, {
    work_type: 'Episode',
    season_alt_id: 'S01',
    episode_alt_id: 'E01'
  }));

  t.ok(areAvailAltIDsEqual({
    work_type: 'Movie',
    alt_id: 'SomeMovie'
  }, {
    work_type: 'Movie',
    alt_id: 'SomeMovie'
  }));

  t.notOk(areAvailAltIDsEqual({
    work_type: 'Movie',
    alt_id: 'SomeMovie'
  }, {
    work_type: 'Movie',
    alt_id: 'AnotherMovie'
  }));
});
