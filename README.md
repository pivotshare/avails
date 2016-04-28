# Avails

Transform Avails metadata to/from TSV, JSON, and XLSX.

## Background

Content Availability Metadata, or **avails**, is an Entertainment industry term for information about the time, location and business rules relating to offering a media asset, e.g. a movie or a television show.

This tool conforms to [EMA Avails](http://www.movielabs.com/md/avails/) spreadsheet template Version 1.6e2.

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
avails -i json -o xlsx <movies.json > movies.xlsx
```

run the tests:
```
npm test
```

## Avails as JSON

This tool uses an unofficial intermediary JSON format for reading/writing Avails. It has a 1-1 mapping with the columns of the Excel-based standard. Keys (columns) are in snake_case. Values are always strings. See [schema](schema) for header values and [test/mock](test/mock) for examples.

Excel was chosen over the XML standard for modeling since most vendors prefer that format.  

## Related Links

- [Content Availability Metadata](http://www.movielabs.com/md/avails/)
- [emavalidator](https://github.com/playmoviespartner/emavalidator/tree/master/emavalidator) - Google's EMA Avails Validator
- [Sending Avails](https://support.google.com/moviestvpartners/answer/2987836?hl=en&ref_topic=6154385): from _Google Movies and TV Partner Help_
