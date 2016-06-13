avails -- tools for parsing and generating EMA Avails
=====================================================

## SYNOPSES

  `avails convert` [-i type] [-o type]

  `avails merge` [-i type] [-o type] [file ...]

## DESCRIPTION

Content Availability Metadata, or _avails_, is an Entertainment industry term for information about the time, location and business rules relating to offering a media asset, e.g. a movie or a television show.

`avails convert` simply transforms avails from one format to another.

`avails merge` will accept one of more avails in chronological order and merge them into a single avails. Merge will treat avails as state so repeated entities with the same _Entry Types_ will be ignored. A _Full Extract_ followed by a _Full Delete_ will result in no entry for that entity.

The following options are available:

  * `-i`, `--input` _<type>_:
    Specify the format of input file: tsv, json, xlsx. Required.

  * `-o`, `--output` _<type>_:
    Specify the format of output file: tsv, json, xlsx. Required.

  * `-h`:
    Display help `avails` or subcommands.

## FORMATS

`avails` conforms to [EMA Avails](http://www.movielabs.com/md/avails/) spreadsheet template Version 1.6e2.

`avails` supports the following formats:
- Tab-serparated values (tsv)
- Microsoft Excel (xlsx)
- JSON (json)

The official Avails XML format is not supported.

The TSV format should not supply headers, as the _Entity Type_ field is used to determine that particular line's schema.

The JSON format is an unofficial format used both for representing Avails, and as an intermediary data structure within `avails`. It has a 1-1 mapping with the columns of the Excel-based standard. Keys (columns) are in snake_case. Values are always strings. See [schema](schema) for header values and [test/mock](test/mock) for examples. Excel was chosen over the XML standard for modeling since most vendors prefer that format.

## EXAMPLES

You can use Avails as a CLI or a library.

as library:
```
const Avails = require('@pivotshare/avails'); // npm install avails
const obj = Avails.fromTSVLine('SomeFilmStudio\tEN\tUS\tMovie'); // etc
// { display_name: 'SomeFilmStudio', store_language: 'EN', territory : 'US', work_type: 'Movie', ... }
```

as CLI:
```
# npm install -g avails
# avails --help
avails convert -i json -o xlsx <movies.json > movies.xlsx
```

## SEE ALSO

[emavalidator](https://github.com/playmoviespartner/emavalidator/tree/master/emavalidator),
[Content Availability Metadata](http://www.movielabs.com/md/avails/),
[Sending Avails](https://support.google.com/moviestvpartners/answer/2987836?hl=en&ref_topic=6154385)
