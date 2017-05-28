(function() {
    'use strict';

    angular.module('ui.numericInput', [])
        .directive('uiNumericInput', ['$filter', function($filter) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, el, attrs, ngModelCtrl) {
                    var NUMBER_REGEXP = /^\s*[-+]?(\d+|\d*\.\d*)\s*$/,
                        min = 1,
                        max,
                        lastValidValue,
                        dotSuffix,
                        firstDecimalZero,
                        positiveInteger = true,
                        minNotEqual,
                        maxNotEqual,
                        maxLength = 9,
                        precision = 0;

                    if (attrs.maxLength >= 1) {
                        maxLength = attrs.maxLength;
                    }

                    if (attrs.allowDecimal) {
                        positiveInteger = false;
                        precision = 2;
                        min = 0;
                    }

                    if (attrs.minNotEqual) {
                        minNotEqual = true;
                    }

                    if (attrs.maxNotEqual) {
                        maxNotEqual = true;
                    }

                    /**
                     * Returns a rounded number in the precision setup by the directive
                     * @param  {Number} num Number to be rounded
                     * @return {Number}     Rounded number
                     */
                    function round(value) {
                        var num = parseFloat(value);
                        var d = Math.pow(10, precision);
                        return Math.round(num * d) / d;
                    }

                    /**
                     * Returns a string that represents the rounded number
                     * @param  {Number} value Number to be rounded
                     * @return {String}       The string representation
                     */
                    function formatPrecision(value) {
                        return parseFloat(value).toFixed(precision);
                    }

                    function getCommaCount(value) {
                        var length = 0;
                        var matchResult = (value + '').match(/,/g);
                        if (matchResult) {
                            length = matchResult.length;
                        }
                        return length;
                    }

                    //Convert to String
                    function formatViewValue(value) {
                        return ngModelCtrl.$isEmpty(value) ? '' : '' + value;
                    }

                    function formatToNumber(value) {
                        return $filter('number')(value);
                    }

                    function numberLength(value) {
                        var length = 0;
                        var matchResult = (value + '').match(/\d/g);
                        if (matchResult) {
                            length = matchResult.length;
                        }
                        return length;
                    }

                    function minValidator(value) {
                        var invalid = minNotEqual ? value <= min : value < min;
                        if (!ngModelCtrl.$isEmpty(value) && invalid) {
                            ngModelCtrl.$setValidity('min', false);
                        } else {
                            ngModelCtrl.$setValidity('min', true);
                        }
                        return value;
                    }

                    function maxValidator(value) {
                        var invalid = maxNotEqual ? value >= max : value > max;
                        if (!ngModelCtrl.$isEmpty(value) && invalid) {
                            ngModelCtrl.$setValidity('max', false);
                        } else {
                            ngModelCtrl.$setValidity('max', true);

                        }
                        return value;
                    }

                    ngModelCtrl.$parsers.push(function(input) {
                        //check undefined and NaN
                        //http://adripofjavascript.com/blog/drips/the-problem-with-testing-for-nan-in-javascript.html
                        if (angular.isUndefined(input) || (input !== input)) {
                            input = '';
                        }

                        var value = input.replace(/\,/g, '');
                        var lastChar = value.substr(value.length - 1);
                        if (!positiveInteger) {
                            dotSuffix = lastChar === '.' ? true : false;
                        }

                        // Handle leading decimal point, like ".5"
                        if (value.indexOf('.') === 0) {
                            value = '0' + value;
                        }

                        firstDecimalZero = /\d*\.0$/.test(value);

                        var empty = ngModelCtrl.$isEmpty(value);
                        if (empty || (NUMBER_REGEXP.test(value) && numberLength(value) <= maxLength)) {
                            lastValidValue = (value === '') ? null : (empty ? value : round(value));
                        } else {
                            // Render the last valid input in the field
                            ngModelCtrl.$setViewValue(formatViewValue(lastValidValue));
                            ngModelCtrl.$render();
                        }
                        ngModelCtrl.$setValidity('numeric', !dotSuffix);
                        return lastValidValue;
                    });

                    ngModelCtrl.$formatters.push(formatToNumber);

                    // Min validation (optional)
                    attrs.$observe('min', function(value) {
                        min = parseFloat(value || min);
                        minValidator(ngModelCtrl.$modelValue);
                    });

                    ngModelCtrl.$parsers.push(minValidator);
                    ngModelCtrl.$formatters.push(minValidator);

                    // Max validation (optional)
                    if (angular.isDefined(attrs.max)) {
                        attrs.$observe('max', function(val) {
                            max = parseFloat(val);
                            maxValidator(ngModelCtrl.$modelValue);
                        });
                        ngModelCtrl.$parsers.push(maxValidator);
                        ngModelCtrl.$formatters.push(maxValidator);
                    }

                    ngModelCtrl.$formatters.push(function(value) {
                        return value ? formatPrecision(value) : value;
                    });

                    //Formatting must be the last of $parser pipeline
                    ngModelCtrl.$parsers.push(function(value) {
                        //This section is for decimal values if positiveInteger flag is false
                        var viewValue = formatToNumber(value);
                        if (!positiveInteger && dotSuffix) {
                            viewValue += '.';
                        }
                        if (!positiveInteger && firstDecimalZero) {
                            viewValue += '.0';
                        }
                        //This logic is used to preserve cursor position after formatting
                        var start = el[0].selectionStart,
                            end = el[0].selectionEnd,
                            oldViewValue = ngModelCtrl.$viewValue;
                        if (getCommaCount(oldViewValue) > getCommaCount(viewValue)) {
                            start--;
                            end--;
                        }
                        if (getCommaCount(oldViewValue) < getCommaCount(viewValue)) {
                            start++;
                            end++;
                        }
                        //Do not use $setViewValue to set viewValue here, because it will trigger $parse pipeline.
                        ngModelCtrl.$viewValue = viewValue;
                        ngModelCtrl.$render();
                        el[0].setSelectionRange(start, end);
                        return value;
                    });
                }
            };
        }]);
})();