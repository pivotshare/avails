
/**
 * A Row is just an Array.
 *
 * @static
 * @class Row
 */
var Row = {

  /**
   * Transform an Object into an array using another array as ordering keys
   *
   * @method fromObject
   * @param  {Object}    obj   -  Avails Object
   * @param  {String[]}  keys  -  Array of object keys
   * @return {Array} Array of primitive types
   */
  fromObject: function fromObject(obj, keys) {
    if (!keys || !Array.isArray(keys)) {
      throw new Error('Keys are not defined or invalid');
    }

    return keys.map(function (i) {
      return obj[i];
    });
  },

  /**
   * Transform an array of values into an Object using another array as keys
   *
   * @method _parse
   * @param  {String[]}  vals  -  Array of objects values
   * @param  {String[]}  keys  -  Array of object keys
   * @return {Object}  Avails Object
   */
  toObject: function toObject(vals, keys) {
    if (!keys || !Array.isArray(keys)) {
      throw new Error('Keys are not defined or invalid');
    }

    return keys.reduce(function (prev, curr, i) {
      prev[curr] = vals[i];
      return prev;
    }, {});
  }
}

module.exports = Row;
