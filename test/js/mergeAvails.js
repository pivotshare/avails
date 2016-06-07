
const test = require('tape');
const fs = require('fs');
const mergeAvails = require('../../lib/mergeAvails');

const AVAILS = [
  require('../../test/mock/merge/01.json'),
  require('../../test/mock/merge/02.json'),
  require('../../test/mock/merge/03.json')
]

const MERGED_AVAILS =  require('../../test/mock/merge/Merged.json')

test('mergeAvails', function (t) {
  t.plan(1);
  const mergedAvails = mergeAvails(AVAILS);
  t.deepEqual(mergedAvails, MERGED_AVAILS);
});
