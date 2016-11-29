[![Bower Version](https://img.shields.io/bower/v/angular-numeric-input.svg?style=flat)](https://github.com/changLiuUNSW/angular-numeric-input/releases) [![NPM Version](http://img.shields.io/npm/v/angular-numeric-input.svg?style=flat)](https://www.npmjs.org/package/angular-numeric-input) [![Build Status](https://travis-ci.org/changLiuUNSW/angular-numeric-input.svg?branch=master)](https://travis-ci.org/changLiuUNSW/angular-numeric-input)

# Angular-numeric-input
An Angular directive for number input to provide real-time number input formatting and validations.

It does a few things:

- Real-time number input formatting
- Support decimal  (max 2 decimal places) and positive integer number
- Support dynamic Min and Max validation
- Support Maximum length validation (default to 9)

**Note** Not suport negative number.

## Usage:

```
bower install angular-numeric-input
```


Load the unminified or minified file from `dist` dir:

```
<script src="dist/angular-numeric-input.js"></script>
```

Then include it as a dependency in your app.

```
angular.module('myApp', ['ui.numericInput'])
```


### Attributes:

- `ng-model`: _required_
- `type`: Set to `text` or `tel` or just leave it out. Do _not_ set to `number`.
- `min`: _optional_ Defaults to `1`.
- `max`: _optional_ Not enforced by default
- `max-length`: _optional_ Defaults to `9`
- `allow-decimal`: _optional_ Defaults to `false` (Postive Integer)
- `min-not-equal`: _optional_ Defaults to `false`
- `max-not-equal`: _optional_ Defaults to `false`

Basic example:

``` html
<input type="tel" ng-model="model" data-numeric-input>
```

`min`, `max` can be set dynamically:

``` html
 <input type="tel" data-numeric-input data-ng-model="model" data-max-length="10" data-min="{{min}}" data-max="{{max}}"/>
```

## Tests:

1. Install test deps: `npm install`
1. Run: `gulp test`
