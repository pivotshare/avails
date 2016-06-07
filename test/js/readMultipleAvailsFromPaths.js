
const test = require('blue-tape');
const fs = require('fs');
const readMultipleAvailsFromPaths = require('../../lib/readMultipleAvailsFromPaths')

const AVAILS = [
  require('../../test/mock/merge/01.json'),
  require('../../test/mock/merge/02.json'),
  require('../../test/mock/merge/03.json')
]

test('readMultipleAvailsFromPaths', function (t) {
  t.plan(1);

  const paths = [
    'test/mock/merge/01.json',
    'test/mock/merge/02.json',
    'test/mock/merge/03.json'
  ]

  return readMultipleAvailsFromPaths(paths, 'json').then(function (avails) {
    t.deepEqual(avails, AVAILS);
  })
});
