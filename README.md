avails -- tool for manipulating EMA Avails
==========================================

## SYNOPSES

  `avails convert` [-i type] [-o type]

  `avails merge` [-i type] [-o type] file1 [file2 ...]

  `avails diff` [-i type] [-o type] file1 file2
  
  `avails ids` [-i type] [-o type]

## DESCRIPTION

`avails convert` simply transforms avails from one format to another.

`avails merge` will accept one of more avails in chronological order and merge them into a single avails. Merge will treat avails as state so repeated entities with the same _Entry Types_ will be ignored. A _Full Extract_ followed by a _Full Delete_ will result in no entry for that entity.

`avails diff` will accept two avails, A and B, and return a new avails containing entries unique to B, without entries that exist in both A and B, and with entries that are only in A as _Full Delete_ entries.

`avails ids` accepts avails and outputs a list of Alt IDs found.

The following options are available:

  * `-i`, `--input` _<type>_:
    Specify the format of input file: tsv, json, xlsx. Required. See [FORMATS](#formats).

  * `-o`, `--output` _<type>_:
    Specify the format of output file: tsv, json, xlsx. Required. See [FORMATS](#formats).

  * `-h`:
    Display help `avails` or subcommands.

See [BACKGROUND](#background) for more information regarding the Avails standard and this tool.

## FORMATS

`avails` conforms to [EMA Avails](http://www.movielabs.com/md/avails/) spreadsheet template Version 1.6e2.

`avails` supports the following formats:
- Tab-separated values (tsv)
- Microsoft Excel (xlsx)
- JSON (json)

The official Avails XML format is not supported.

The TSV format should not supply headers, as the _Entity Type_ field is used to determine that particular line's schema.

The JSON format is an unofficial format used both for representing Avails, and as an intermediary data structure within `avails`. It has a 1-1 mapping with the columns of the Excel-based standard. Keys (columns) are in snake_case. Values are always strings. See [schema](schema) for header values and [test/mock](test/mock) for examples. Excel was chosen over the XML standard for modeling since most vendors prefer that format.

## BACKGROUND

Content Availability Metadata, or _avails_, is an Entertainment industry term for information about the time, location and business rules relating to offering a media asset, e.g. a movie or a television show.

_avails_ document the transition between states, e.g. _Full Extract_, _Full Delete_, not states themselves, however, by manipulating initial and subsequent avails we can recreate the expected state of content on a given platform. This is the technique utilized by the `merge` and `diff` subcommands, and third-party tools that generate initial avails.

It is recommended to persist submitted avails and use `avails`, together with custom or third-party tools, to easily create new avails, or determine state of content on third-party platforms.

## INSTALLATION

You can use `avails` as a CLI or a Node.JS module.

as CLI:
```sh
npm install -g avails
avails convert -i json -o xlsx <movies.json >movies.xlsx
```

as module:
```js
// npm install avails
const Avails = require('@pivotshare/avails');
const obj = Avails.fromTSVLine('SomeFilmStudio\tEN\tUS\tMovie');
```

## SEE ALSO

[emavalidator](https://github.com/playmoviespartner/emavalidator/tree/master/emavalidator),
[Content Availability Metadata](http://www.movielabs.com/md/avails/),
[Sending Avails](https://support.google.com/moviestvpartners/answer/2987836?hl=en&ref_topic=6154385)
