
const test = require('tape');
const fs = require('fs');
const diffAvails = require('../../lib/diffAvails');

const AVAILS = [
  require('../../test/mock/merge/01.json'),
  require('../../test/mock/merge/02.json'),
]

const DIFFED_AVAILS =  require('../../test/mock/merge/Diffed.json')

test('diffAvails', function (t) {
  t.plan(1);
  const diffedAvails = diffAvails(AVAILS[0], AVAILS[1]);
  t.deepEqual(diffedAvails, DIFFED_AVAILS);
});
