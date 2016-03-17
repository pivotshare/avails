
var AVAILS_HEADERS_MOVIE = require('../schema/headers-movie.json');
var AVAILS_HEADERS_TV = require('../schema/headers-tv.json');

var Row = require('./row');
var TSV = require('./tsv');

var Avails = {

  /**
   * Parse an Avail Object into an Avail Array
   *
   * @method toArray
   * @param  {Object}  obj   -  Avails Object
   * @return {Array}   Array of primitive types
   */
  toArray: function (obj) {
    switch (obj.work_type) {
      case 'Season':
      case 'Episode':  return Row.fromObject(obj, AVAILS_HEADERS_TV);
      case 'Movie':    return Row.fromObject(obj, AVAILS_HEADERS_MOVIE);
      default:         throw new Error('Unsupported WorkType: ' + workType);
    }
  },

  /**
   * Parse an Avail array into an Avail object
   *
   * @method toArray
   * @param  {Object}  obj   -  Avails Object
   * @return {Array}   Array of primitive types
   */
  fromArray: function parse(arr) {
    var workType = arr[3]; // always per standard
    switch (workType) {
      case 'Season':
      case 'Episode':  return Row.toObject(arr, AVAILS_HEADERS_TV);
      case 'Movie':    return Row.toObject(arr, AVAILS_HEADERS_MOVIE);
      default:         throw new Error('Unsupported WorkType: ' + workType);
    }
  },

  /**
   * Transform an Avail object into a TSV string
   *
   * @method toArray
   * @param  {Object}  obj   -  Avails Object
   * @return {String}
   */
  toTSVLine: function (obj) {
    return Avails.toArray(obj).join('\t');
  },

  /**
   * Transform a TSV string into an Avail object
   *
   * @method toArray
   * @param  {Object}  obj   -  Avails Object
   * @return {String}
   */
  fromTSVLine: function (str) {
    return Avails.fromArray(TSV.parseLine(str))
  }
};

module.exports = Avails;
