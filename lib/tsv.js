
var Row = require('./row');

var TSV = {

  /**
   * Transform a TSV String into an Array, or an Object if keys Array is
   * provided.
   *
   * @method parseLine
   * @param  {String}    str   -  TSV String
   * @param  {String[]}  keys  -  Array of object keys
   * @return {Array|Object}  Representation of TSV string
   */
  parseLine: function (str, keys) {
    var vals = str.replace(/^\n|\n$/, '').split('\t');
    if (Array.isArray(keys)) {
      return Row.toObject(vals, keys);
    } else {
      return vals;
    }
  },

  /**
   * Transform a multiline TSV String into an Array of Arrays, or Objects if
   * keys Array is provided.
   *
   * @method parse
   * @param  {String}    str   -  multiline TSV String
   * @param  {String[]}  keys  -  Array of object keys
   * @return {Array[]|Object[]}  Representation of TSV strings
   */
  parse: function (str, keys) {
    var lines = str.replace(/^\n|\n$/, '').split('\n');
    return lines.map(function (line) {
      return TSV.parseLine(line, keys);
    });
  },

  /**
   * Transform an Array or Object into TSV string
   *
   * @method stringifyLine
   * @param  {Object|Array}  obj     -  TSV Object or Array
   * @param  {String[]}      [keys]  -  Array of object keys
   * @return {String}  TSV String
   */
  stringifyLine: function (obj, keys) {
    if (Array.isArray(obj)) {
      return obj.join('\t');
    } else {
      return Row.fromObject(obj, keys).join('\t');
    }
  },

  /**
   * Transform an Array or Arrays or Objects into a multiline TSV string
   *
   * @method stringify
   * @param  {Object[]|Array[]}  arr     -  Array of TSV Objects or Arrays
   * @param  {String[]}          [keys]  -  Array of object keys
   * @return {String}  multiline TSV String
   */
  stringify: function (arr, keys) {
    return arr.map(function (i) {
      return TSV.stringifyLine(i, keys);
    }).join('\n');
  }

}

module.exports = TSV;
