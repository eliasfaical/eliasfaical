// Assigning modules to local variables
var gulp        = require( 'gulp' );
var jshint      = require( 'gulp-jshint' );
var browserSync = require( 'browser-sync' ).create();
var header      = require( 'gulp-header' );
var cleanCSS    = require( 'gulp-clean-css' );
var concat      = require( 'gulp-concat' );
var uglify      = require( 'gulp-uglify' );
var stylus      = require( 'gulp-stylus' );
var rename      = require( 'gulp-rename' );
var notify      = require( 'gulp-notify' );
var pkg         = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * <%= pkg.title %> - v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');


// Default task
gulp.task('default', ['lint', 'stylus', 'scripts', 'minify-css', 'minify-js', 'copy']);


// Lint task
gulp.task( 'lint', function() {
    gulp.src( 'main/js/main-script.js' )
    .pipe( jshint() )
    .pipe( jshint.reporter('default'));
});


// Stylus - task to compile the stylus files and add the banner
gulp.task('stylus', function() {
    return gulp.src('assets/styles/main.styl')
        .pipe(stylus())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


// Minify CSS
gulp.task('minify-css', function() {
    return gulp.src('assets/css/main.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('assets/js/main-script.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


// Concatenate & Minify JS
var js = [
    './assets/js/vendor/jquery-1.12.0.min.js',
    './assets/js/vendor/modernizr-2.8.3.min.js'
];

gulp.task('scripts', function() {
    return gulp.src(js)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./assets/js/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/dist'));
});
  

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
});


// Watch Task that compiles STYLUS and watches for HTML or JS changes and reloads with browserSync
gulp.task('dev', ['browserSync', 'stylus', 'minify-css', 'minify-js'], function() {
    gulp.watch('assets/styles/**/*.styl', ['stylus']);
    gulp.watch('assets/css/*.css', ['minify-css']);
    gulp.watch('assets/js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('assets/js/**/*.js', browserSync.reload);
});
