
const areAvailAltIDsEqual = require('./areAvailAltIDsEqual');

module.exports = function diffAvails(availsA, availsB) {
  /**
  Diff state Avails into one transition Avails

  Similar to f([A, B]) = B - A, except if entry exists in earlier Avails,
  but not in new ones, then explicitly create a "Full Delete" entry.

  @param  {Avails}  availsA - Avails A
  @param  {Avails}  availsB - Avails B
  @return {Avails}
  */

  // clone B array as it will be mutated
  const diff = JSON.parse(JSON.stringify(availsB));

  availsA.forEach(function (currAvail) {
    const existingAvailIndex = diff.findIndex(function (avail) {
      return areAvailAltIDsEqual(avail, currAvail)
    })

    if (existingAvailIndex >= 0) { // found
      diff.splice(existingAvailIndex, 1);
    } else {
      // assume content needs to be removed
      diff.push(Object.assign({}, currAvail, {
        entry_type: "Full Delete"
      }));
    }
  })

  return diff;
}
