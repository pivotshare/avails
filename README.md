# Avails

Content Availability Metadata, or **avails**, is an Entertainment industry term for information about the time, location and business rules relating to offering a media asset, e.g. a movie or a television show.

## Usage

You can use Avails as a CLI or a library.

as library:
```
var Avails = require('avails'); // npm install avails
var obj = Avails.fromTSVLine('SomeFilmStudio\tEN\tUS\tMovie'); // etc
// { display_name: 'SomeFilmStudio', store_language: 'EN', territory : 'US', work_type: 'Movie', ... }
```

as CLI:
```
# npm install -g avails
# avails --help
avails -i json -o tsv <movies.json > movies.tsv
```

run the tests:
```
npm test
```

## References
- [Content Availability Metadata](http://www.movielabs.com/md/avails/)
- [emavalidator](https://github.com/playmoviespartner/emavalidator/tree/master/emavalidator)
- [Sending Avails](https://support.google.com/moviestvpartners/answer/2987836?hl=en&ref_topic=6154385): from _Google Movies and TV Partner Help_
