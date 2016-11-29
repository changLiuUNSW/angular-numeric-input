var gulp = require('gulp');
var karmaServer = require('karma').Server;
var _ = require('lodash');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var del = require('del');
var path = require('path');

var SRC = 'src/angular-numeric-input.js';
var DEST = 'dist/';

gulp.task('dist', function() {
    return gulp.src(SRC)
        .pipe(ngAnnotate())

    // dist/angular-money-directive.js
    .pipe(gulp.dest(DEST))

    // .min.js + .min.js.map
    .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(DEST));
});

// This allows us to read a karma.conf file and make changes without changing the file
var setKarmaConfig = require('./karma.conf.js');
var testConfig = {
    set: function(newConfig) {
        _.assign(testConfig, newConfig);
    }
};

setKarmaConfig(testConfig);

gulp.task('test', function(done) {
    new karmaServer(_.assign({}, testConfig, {
        action: 'run'
    }), function() {
        done();
    }).start();
});

gulp.task('test:debug', function(done) {
    new karmaServer(_.assign({}, testConfig, {
        singleRun: false,
        autoWatch: true,
        reporters: ['mocha'],
        browsers: ['Chrome']
    }), function() {
        done();
    }).start();
});

gulp.task('clean', function() {
    return del.sync(DEST);
});

gulp.task('build', ['clean', 'dist']);