var gulp = require('gulp');

var gulp = require( 'gulp' ),
  plumber = require( 'gulp-plumber' ),
  watch = require( 'gulp-watch' ),
  livereload = require( 'gulp-livereload' ),
  minifycss = require( 'gulp-minify-css' ),
  jshint = require( 'gulp-jshint' ),
  stylish = require( 'jshint-stylish' ),
  uglify = require( 'gulp-uglify' ),
  rename = require( 'gulp-rename' ),
  notify = require( 'gulp-notify' ),
  include = require( 'gulp-include' ),
  sass = require( 'gulp-sass' );

var onError = function( err ) {
  console.log( 'An error occurred:', err.message );
  this.emit( 'end' );
}

gulp.task( 'scss', function() {
  return gulp.src( './scss/style.scss' )
    .pipe( plumber( { errorHandler: onError } ) )
    .pipe( sass() )
    .pipe( gulp.dest( './css/' ) )
    .pipe( minifycss() )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( gulp.dest( './css/' ) )
    .pipe( livereload() );
} );

gulp.task( 'watch', function() {
  livereload.listen();
  gulp.watch( './scss/**/*.scss', [ 'scss' ] );
  gulp.watch( './**/*.php' ).on( 'change', function( file ) {
    livereload.changed( file );
  } );
} );

gulp.task( 'default', [ 'scss', 'watch' ], function() {

} );