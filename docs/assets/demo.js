'use strict';

var app = angular.module('demo', ['ngSanitize', 'ngMessages', 'ui.numericInput']);

app.controller('DemoCtrl', function($scope) {
    var vm = this;
    vm.min = 1;
    vm.max = 1000;
});