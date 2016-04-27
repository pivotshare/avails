
var test = require('tape');
var superuppercamelcase = require('../../lib/superuppercamelcase');

test('superuppercamelcase: unique_id', function (t) {
  t.plan(1);

  var arr = ['Id', 'Tv'];

  t.equal(superuppercamelcase('unique_id', arr), 'UniqueID');
});

test('superuppercamelcase: unique_id_id', function (t) {
  t.plan(1);

  var arr = ['Id', 'Tv'];

  t.equal(superuppercamelcase('unique_id_id', arr), 'UniqueIDID');
});

test('superuppercamelcase: unique_id_identity', function (t) {
  t.plan(1);

  var arr = ['Id', 'Tv'];

  t.equal(superuppercamelcase('unique_id_identity', arr), 'UniqueIDIdentity');
});
