[![Bower Version](https://img.shields.io/bower/v/angular-numeric-input.svg?style=flat)](https://github.com/changLiuUNSW/angular-numeric-input/releases) [![NPM Version](http://img.shields.io/npm/v/angular-numeric-input.svg?style=flat)](https://www.npmjs.org/package/angular-numeric-input) [![Build Status](https://travis-ci.org/changLiuUNSW/angular-numeric-input.svg?branch=master)](https://travis-ci.org/changLiuUNSW/angular-numeric-input)

# Angular-numeric-input
An Angular directive for number input to provide **real-time** number input formatting and validations.

It does a few things:

- Real-time number input formatting
- Support decimal  (max 2 decimal places) and positive integer number
- Support dynamic Min and Max validation
- Support Maximum length validation (default to 9)

**Note** Not suport negative number.

## Latest Changes

- Check [CHANGELOG.md](/CHANGELOG.md)

## Demo

[See directive in action] (https://cdn.rawgit.com/changLiuUNSW/angular-numeric-input/master/docs/index.html)

## Angular Requirements
Require Angular 1.3.0 or higher and it has been tested with Angular 1.5.8.

## Installation Methods

### npm
```
$ npm install angular-numeric-input
```
### bower
```
$ bower install angular-numeric-input
```

## Usage

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
<input type="tel" ng-model="model" ui-numeric-input>
```

`min`, `max` can be set dynamically:

``` html
<input type="tel" ui-numeric-input ng-model="model" data-min="{{min}}" data-max="{{max}}"/>
```

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install global dev dependencies: `npm install -g gulp`
* Install local dev dependencies: `npm install` in repository directory

### Development Commands

* `gulp` to build and test
* `gulp build` to build
* `gulp test` for one-time test with karma

## Contributing

- Run the tests
- Try the [examples](./docs/index.html)
