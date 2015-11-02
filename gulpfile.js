/rest//*global -$ */
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var mainBowerFiles = require('main-bower-files');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Error notifications
var reportError = function(error) {
  $.notify({
    title: 'Gulp Task Error',
    message: 'Check the console.'
  }).write(error);
  console.log(error.toString());
  this.emit('end');
}
var config = {
    bootstrapDir: './bower_components/bootstrap-sass',

};

// Sass processing
gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
    .pipe($.sourcemaps.init())
    // Convert sass into css
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: [config.bootstrapDir + 'assets/stylesheets/bootstrap']
    }))
    // Show errors
    .on('error', reportError)
    // Autoprefix properties
    .pipe($.autoprefixer({
      browsers: ['last 2 versions']
    }))
    // Write sourcemaps
    .pipe($.sourcemaps.write())
    // Save css
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe($.notify({
      title: "SASS Compiled",
      message: "Your CSS files are ready sir.",
      onLast: true
    }));
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('js/**/*.js')
        .pipe(gulp.dest('js'));
});

// Optimize Images
gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{
        cleanupIDs: false
      }]
    }))
    .pipe(gulp.dest('images'));
});

// JS hint
gulp.task('jshint', function() {
  return gulp.src('js/*.js')
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.notify({
      title: "JS Hint",
      message: "JS Hint says all is good.",
      onLast: true
    }));
});

// Beautify JS
gulp.task('beautify', function() {
  gulp.src('js/*.js')
    .pipe($.beautify({indentSize: 2}))
    .pipe(gulp.dest('scripts'))
    .pipe($.notify({
      title: "JS Beautified",
      message: "JS files in the theme have been beautified.",
      onLast: true
    }));
});

// Compress JS
gulp.task('compress', function() {
  return gulp.src('js/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('scripts'))
    .pipe($.notify({
      title: "JS Minified",
      message: "JS files in the theme have been minified.",
      onLast: true
    }));
});

// Run drush to clear the theme registry
gulp.task('drush', function() {
  return gulp.src('', {
      read: false
    })
    .pipe($.shell([
      'drush cc views',
    ]))
    .pipe($.notify({
      title: "Caches cleared",
      message: "Drupal caches cleared.",
      onLast: true
    }));
});

// BrowserSync
gulp.task('browser-sync', function() {
  //watch files
  var files = [
    'styles/main.css',
    'js/**/*.js',
    'images/**/*',
    'templates/**/*.twig'
  ];
  browserSync.init({
    proxy: "p4p.dev:8080" ,
    online: true
  });
  //initialize browsersync

});
// gulp.task('bower', function() {
//     // mainBowerFiles is used as a src for the task,
//     // usually you pipe stuff through a task
//     return gulp.src(mainBowerFiles())
//         // Then pipe it to wanted directory, I use
//         // dist/lib but it could be anything really
//         .pipe(gulp.dest('dist/lib'))
// });

// Default task to be run with `gulp`
gulp.task('default', ['sass', 'browser-sync', 'js', 'drush'], function() {
  
  gulp.watch("scss/**/*.scss", ['sass']);
  gulp.watch("bower_components/bootstrap-sass/assets/stylesheets/**/*.scss", ['sass']);
  gulp.watch("js/**/*.js", ['js']);
  gulp.watch("templates/*.twig", ['drush']);
  gulp.watch("**/*.yml", ['drush']);
  gulp.watch("**/*.theme", ['drush']);
  gulp.watch("src/*.php", ['drush']);
});