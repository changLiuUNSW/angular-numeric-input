module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/jquery/dist/jquery.js',
            'src/angular-numeric-input.js',
            'test/angular-numeric-input.spec.js'
        ],
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        autoWatch: false,
        browsers: ['PhantomJS'],
        browserNoActivityTimeout: 60000,
        singleRun: true
    });
};