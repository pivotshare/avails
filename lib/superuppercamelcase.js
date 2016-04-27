
var uppercamelcase = require('uppercamelcase');

/**
 * Upper camelcase a string with specified substrings uppercased.
 *
 * @method superuppercamelcase
 * @param {String} str - string in snake case
 * @param {String[]} subStrs - array of uppercamelcase strings that should be uppercased in str
 * @return {String} string in superuppercamelcase
 */
function superuppercamelcase(str, subStrs) {

  var subStrs = subStrs || ['Id'];
  var regex = new RegExp('(' + subStrs.join('|') + ')(?![a-z]+)', 'g');

  return uppercamelcase(str).replace(regex, function (match) {
    return match.toUpperCase();
  })
}

module.exports = superuppercamelcase;
