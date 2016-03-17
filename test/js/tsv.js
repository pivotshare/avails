
var test = require('tape');
var TSV = require('../../lib/tsv.js');

test('TSV.parseLine:Array', function (t) {
  t.plan(1);

  var line = "sock\tblue\tmedium";
  //var keys = ['name', 'color', 'size'];

  var actual = TSV.parseLine(line);
  var expected = ['sock', 'blue', 'medium'];

  t.deepEqual(actual, expected);
});

test('TSV.parseLine:Object', function (t) {
  t.plan(1);

  var line = "sock\tblue\tmedium";
  var keys = ['name', 'color', 'size'];

  var actual = TSV.parseLine(line, keys);
  var expected = {
    name: 'sock',
    color: 'blue',
    size:  'medium'
  }

  t.deepEqual(actual, expected);
});

test('TSV.parse:Array', function (t) {
  t.plan(1);

  var line = "sock\tblue\tmedium\nshirt\tred\tmedium\npants\tblue\tlarge\n";
  //var keys = ['name', 'color', 'size'];

  var actual = TSV.parse(line);
  var expected = [
    ['sock', 'blue', 'medium'],
    ['shirt', 'red', 'medium'],
    ['pants', 'blue', 'large']
  ];

  t.deepEqual(actual, expected);
});

test('TSV.parse:Object', function (t) {
  t.plan(1);

  var line = "sock\tblue\tmedium\nshirt\tred\tmedium\npants\tblue\tlarge\n";
  var keys = ['name', 'color', 'size'];

  var actual = TSV.parse(line, keys);
  var expected = [
    {
      name: 'sock',
      color: 'blue',
      size:  'medium'
    },
    {
      name: 'shirt',
      color: 'red',
      size:  'medium'
    },
    {
      name: 'pants',
      color: 'blue',
      size:  'large'
    }
  ];

  t.deepEqual(actual, expected);
});

test('TSV.stringifyLine:Array', function (t) {
  t.plan(1);

  var arr = ['sock', 'blue', 'medium'];

  var actual = TSV.stringifyLine(arr);
  var expected = "sock\tblue\tmedium";

  t.deepEqual(actual, expected);
});

test('TSV.stringifyLine:Object', function (t) {
  t.plan(1);

  var obj = {
    name: 'sock',
    color: 'blue',
    size:  'medium'
  }

  var keys = ['size', 'name', 'color'];
  var actual = TSV.stringifyLine(obj, keys);
  var expected = "medium\tsock\tblue";

  t.deepEqual(actual, expected);
});

test('TSV.stringify:Array', function (t) {
  t.plan(1);

  var arr = [
    {
      name: 'sock',
      color: 'blue',
      size:  'medium'
    },
    {
      name: 'shirt',
      color: 'red',
      size:  'medium'
    },
    {
      name: 'pants',
      color: 'blue',
      size:  'large'
    }
  ];

  var keys = ['name', 'color', 'size'];
  var actual = TSV.stringify(arr, keys);
  var expected = "sock\tblue\tmedium\nshirt\tred\tmedium\npants\tblue\tlarge";

  t.deepEqual(actual, expected);
});
