describe('numericInput: test spec', function() {

    var $scope,
        $compile,
        $filter,
        inputElement,
        templateDefault = '<input type="tel" class="form-control" data-ng-model="model" ui-numeric-Input required />',
        templateDefaultWithMaxLength = '<input type="tel" class="form-control" data-ng-model="model" ui-numeric-Input max-length="2" required />',
        templateDefaultWithMinMax = '<input type="tel" class="form-control" data-ng-model="model" min="100" max="1000" ui-numeric-Input required />',
        templateDefaultWithMinNotEqual = '<input type="tel" class="form-control" data-ng-model="model" min="100" min-not-equal="true" ui-numeric-Input required />',
        templateAllowDecimal = '<input type="tel" class="form-control" data-ng-model="model" ui-numeric-Input allow-decimal="true" required />',
        templateAllowDecimalWithMinMax = '<input type="tel" class="form-control" data-ng-model="model" min="100" max="1000" ui-numeric-Input allow-decimal="true" required />';
    var initDefault = function(model) {
        $scope.model = model;
        inputElement = $compile(templateDefault)($scope);
        $scope.$apply();
    };

    var initDefaultWithMinNotEqual = function(model) {
        $scope.model = model;
        inputElement = $compile(templateDefaultWithMinNotEqual)($scope);
        $scope.$apply();
    };

    var intDefaultWithMaxLength = function(model) {
        $scope.model = model;
        inputElement = $compile(templateDefaultWithMaxLength)($scope);
        $scope.$apply();
    };

    var initDefaultWithMinMax = function(model) {
        $scope.model = model;
        inputElement = $compile(templateDefaultWithMinMax)($scope);
        $scope.$apply();
    };

    var initAllowDecimalWithMinMax = function(model) {
        $scope.model = model;
        inputElement = $compile(templateAllowDecimalWithMinMax)($scope);
        $scope.$apply();
    };

    var initAllowDecimal = function(model) {
        $scope.model = model;
        inputElement = $compile(templateAllowDecimal)($scope);
        $scope.$apply();
    };

    beforeEach(module('ui.numericInput'));
    beforeEach(inject(
        function($injector) {
            $scope = $injector.get('$rootScope').$new();
            $compile = $injector.get('$compile');
            $filter = $injector.get('$filter');
        }
    ));

    it('test for default config: input 1234 should be auto-formatting to 1,234', function() {
        initDefault();

        inputElement.val('1234');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');

        expect(ngModel.$viewValue).toEqual('1,234');
        expect(inputElement.val()).toEqual('1,234');
    });

    it('test for default config: input 1234. should be auto-formatting to 1,234', function() {
        initDefault();

        inputElement.val('1234.');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');

        expect(ngModel.$viewValue).toEqual('1,234');
        expect(inputElement.val()).toEqual('1,234');
    });

    it('test for default config: input 0 should be auto-formatting to 0 with min error', function() {
        initDefault();

        inputElement.val('0');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');
        expect(ngModel.$viewValue).toEqual('0');
        expect(inputElement.val()).toEqual('0');
        expect(ngModel.$error.min).toEqual(true);
    });

    it('test for default config: input . should be auto-formatting to 0 with min error', function() {
        initDefault();

        inputElement.val('.');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');
        expect(ngModel.$viewValue).toEqual('0');
        expect(inputElement.val()).toEqual('0');
        expect(ngModel.$error.min).toEqual(true);
    });

    it('test for default config with min 100 and max 1000: input 99 should be auto-formatting to 99 with min error', function() {
        initDefaultWithMinMax();

        inputElement.val('99');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');
        expect(ngModel.$viewValue).toEqual('99');
        expect(inputElement.val()).toEqual('99');
        expect(ngModel.$error.min).toEqual(true);
    });

    it('test for default config with min 100 and max 1000: input 100 should be auto-formatting to 100 with no min error', function() {
        initDefaultWithMinMax();

        inputElement.val('100');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');
        expect(ngModel.$viewValue).toEqual('100');
        expect(inputElement.val()).toEqual('100');
        expect(ngModel.$error.min).not.toEqual(true);
    });

    it('test for default config with min 100 and max 1000: input 10001 should be auto-formatting to 10,001 with max error', function() {
        initDefaultWithMinMax();

        inputElement.val('10001');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');
        expect(ngModel.$viewValue).toEqual('10,001');
        expect(inputElement.val()).toEqual('10,001');
        expect(ngModel.$error.max).toEqual(true);
    });

    it('test for allow decimal config: input . should be auto-formatting to 0. with numeric error', function() {
        initAllowDecimal();

        inputElement.val('.');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');
        expect(ngModel.$viewValue).toEqual('0.');
        expect(inputElement.val()).toEqual('0.');
        expect(ngModel.$error.numeric).toEqual(true);
    });

    it('test for allow decimal config: input 1234. should be auto-formatting to 1,234. with numeric error', function() {
        initAllowDecimal();

        inputElement.val('1234.');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');
        expect(ngModel.$viewValue).toEqual('1,234.');
        expect(inputElement.val()).toEqual('1,234.');
        expect(ngModel.$error.numeric).toEqual(true);
    });

    it('test for allow decimal config: input 1234.5 should be auto-formatting to 1,234.5', function() {
        initAllowDecimal();

        inputElement.val('1234.5');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');
        expect(ngModel.$viewValue).toEqual('1,234.5');
        expect(inputElement.val()).toEqual('1,234.5');
    });

    it('test for allow decimal config: input 1234.567 should be auto-formatting to 1,234.57', function() {
        initAllowDecimal();

        inputElement.val('1234.567');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');
        expect(ngModel.$viewValue).toEqual('1,234.57');
        expect(inputElement.val()).toEqual('1,234.57');
    });


    it('test for allow decimal config with min 100 and max 1000: input 99.99 should be auto-formatting to 99.99 with min error', function() {
        initAllowDecimalWithMinMax();

        inputElement.val('99.99');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');
        expect(ngModel.$viewValue).toEqual('99.99');
        expect(inputElement.val()).toEqual('99.99');
        expect(ngModel.$error.min).toEqual(true);
    });

    it('test for allow decimal config with min 100 and max 1000: input 100.11 should be auto-formatting to 100.11 with no min error', function() {
        initAllowDecimalWithMinMax();

        inputElement.val('100.11');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');
        expect(ngModel.$viewValue).toEqual('100.11');
        expect(inputElement.val()).toEqual('100.11');
        expect(ngModel.$error.min).not.toEqual(true);
    });

    it('test for allow decimal config with min 100 and max 1000: input 1000.11 should be auto-formatting to 1,000.11 with max error', function() {
        initAllowDecimalWithMinMax();

        inputElement.val('1000.11');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');
        expect(ngModel.$viewValue).toEqual('1,000.11');
        expect(inputElement.val()).toEqual('1,000.11');
        expect(ngModel.$error.max).toEqual(true);
    });

    it('test for default config with max length 2: input 13 and then input 134 should be auto-formatting to last valid value', function() {
        intDefaultWithMaxLength();

        inputElement.val('13');
        inputElement.triggerHandler('input');

        inputElement.val('134');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');

        expect(ngModel.$viewValue).toEqual('13');
        expect(inputElement.val()).toEqual('13');
    });


    it('test for default config with min 100 and Min not equal: input 100 should be auto-formatting 100 and min error is true', function() {
        initDefaultWithMinNotEqual();

        inputElement.val('100');
        inputElement.triggerHandler('input');

        var ngModel = inputElement.controller('ngModel');

        expect(ngModel.$viewValue).toEqual('100');
        expect(inputElement.val()).toEqual('100');
        expect(ngModel.$error.min).toEqual(true);
    });

    // start test with initial value
    it('test for default config: initial model value is 1000 should be auto-formatting to 1,000', function() {
        initDefault(1000);

        var ngModel = inputElement.controller('ngModel');
        expect(inputElement.val()).toEqual('1,000');
        expect(ngModel.$viewValue).toEqual('1,000');
        expect(ngModel.$modelValue).toEqual(1000);
    });

    it('test for default config: initial model value is "1000" should be auto-formatting to 1,000', function() {
        initDefault('1000');
        var ngModel = inputElement.controller('ngModel');
        expect(inputElement.val()).toEqual('1,000');
        expect(ngModel.$viewValue).toEqual('1,000');
        expect(ngModel.$modelValue).toEqual('1000');
    });

    it('test for default config: initial model value is null should be auto-formatting to empty string', function() {
        initDefault(null);
        var ngModel = inputElement.controller('ngModel');
        expect(inputElement.val()).toEqual('');
        expect(ngModel.$viewValue).toEqual(null);
        expect(ngModel.$modelValue).toEqual(null);
    });

    it('test for default config: initial model value is undefined should be auto-formatting to empty string', function() {
        initDefault(undefined);
        var ngModel = inputElement.controller('ngModel');
        expect(inputElement.val()).toEqual('');
        expect(ngModel.$viewValue).toEqual(undefined);
        expect(ngModel.$modelValue).toEqual(undefined);
    });

    it('test for default config: initial model value is "abc" should be auto-formatting to empty string', function() {
        initDefault('abc');
        var ngModel = inputElement.controller('ngModel');
        expect(inputElement.val()).toEqual('');
        expect(ngModel.$viewValue).toEqual('');
        expect(ngModel.$modelValue).toEqual('abc');
    });
});