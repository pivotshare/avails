
/**
 * Get unique AltID for each Avail.
 *
 * @param   {Avails}    avails
 * @return  {String[]}  Alt IDs
 * @throws  {Error}
 */
module.exports = function getAvailsAltIDs(avails) {
  return avails.map(function (avail) {
    switch (avail.work_type) {
      // NOTE: That EMA Avails do not yet support individual 'Series' entries
      case 'Series':
        return avail.series_alt_id;
      case 'Season':
        return avail.season_alt_id;
      case 'Episode':
        return avail.episode_alt_id;
      case 'Movie':
        return avail.alt_id;
      default:
        throw new Error('Unknown Avails WorkType: ' + avail.work_type);
    }
  })
}