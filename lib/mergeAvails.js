
const areAvailAltIDsEqual = require('./areAvailAltIDsEqual');

module.exports = function mergeAvails(availsArr) {
  /**
  Merge Avails into one.
  Assumes list of Avails is in chronological order.
  @param  {Avails[]}  availsArr - Array of Avails
  @return {Avails}
  */
  return availsArr && availsArr.reduce(function (merged, curr, idx) {
    if (!Array.isArray(curr))
      throw new Error('An item in mergeAvails list is not an Array');

    // there is absolutely nothing efficient about this algorithm
    curr.forEach(function (currAvail) {
      const existingAvailIndex = merged.findIndex(function (avail) {
        return areAvailAltIDsEqual(avail, currAvail)
      })

      if (existingAvailIndex === -1) {
        merged.push(currAvail);
      }
      else {
        // Avail exists, but check if EntryType changed
        if (currAvail.entry_type === 'Full Delete') {
          merged.splice(existingAvailIndex, 1);
        }
      }
    })
    return merged;
  }, [])
}
