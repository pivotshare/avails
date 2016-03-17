
var test = require('tape');
var Row = require('../../lib/row.js');

test('Row.toObject', function (t) {
  t.plan(1);

  var keys = ['name', 'color', 'size'];
  var vals = ['sock', 'blue', 'medium'];

  var actual = Row.toObject(vals, keys);
  var expected = {
    name: 'sock',
    color: 'blue',
    size:  'medium'
  }

  t.deepEqual(actual, expected);
});

test('Row.fromObject', function (t) {
  t.plan(1);

  var obj = {
    name: 'sock',
    color: 'blue',
    size:  'medium'
  }
  var keys = ['size', 'name', 'color'];

  var expected = ['medium', 'sock', 'blue'];
  var actual = Row.fromObject(obj, keys);

  t.deepEqual(actual, expected);
});
