
module.exports = function areAvailAltIDsEqual(a, b) {
  /**
  Check whether the appropriate AltID of two avails are equivalent
  @param   {Avail} a
  @param   {Avail} b
  @return  {Boolean}
  */

  if (a.work_type !== b.work_type)
    return false;

  switch (a.work_type) {
    case 'Season':
      return a.season_alt_id === b.season_alt_id;
    case 'Episode':
      return a.episode_alt_id === b.episode_alt_id;
    case 'Movie':
      return a.alt_id === b.alt_id;
    default:
      return false;
  }
}