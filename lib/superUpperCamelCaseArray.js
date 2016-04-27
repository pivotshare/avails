
var superuppercamelcase = require('./superuppercamelcase');

/**
 * Take an array of Avails-related snake_case Strings and SuperUpperCamelCase
 * them.
 *
 * @method  superUpperCamelCaseArray
 * @param   {String[]} arr - Array of snake_case Strings
 * @return  {String[]} - Array of SuperUpperCamelCase String
 */
function superUpperCamelCaseArray(arr) {
  return arr.map(function (v) {
    return superuppercamelcase(v, [
      'Tv',
      'Id',
      'Srp',
      'Hv'
    ]);
  });
}

module.exports = superUpperCamelCaseArray;
