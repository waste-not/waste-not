'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
// const Server = require('karma').Server;

const scripts = ['index.js', 'lib/*.js', 'test/**/*.js', 'models/*.js',
  'routes/*.js', 'client/**/*.js?(x)', '!test/client/test_bundle.js'];
const clientScripts = ['client/**/*.js?(x)'];
const staticFiles = ['client/**/*.html'];
const clientTests = ['test/client/*.js', '!test/client/test_bundle.js'];

gulp.task('static:dev', () => {
  gulp.src(staticFiles, { 'base': 'client' })
    .pipe(gulp.dest('build/'));
});

gulp.task('sass:dev', () => {
  gulp.src('client/sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build'));
});

gulp.task('build:dev', () => {
  webpack({
    entry: ['./client/index.js'],
    output: {
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    devtool: 'source-map'
  })
  .pipe(gulp.dest('dist/'));
});

gulp.task('lint', () => {
  return gulp.src(scripts)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', () => {
  gulp.watch(scripts, ['lint']);
  gulp.watch(clientScripts, ['build:dev']);
  gulp.watch(staticFiles, ['static:dev']);
  // gulp.watch(clientTests, ['test:client']);
  gulp.watch('client/sass/*.sass', ['sass:dev']);
});

gulp.task('dev', ['lint', 'static:dev', 'build:dev', 'sass:dev']);

gulp.task('default', ['watch', 'dev']);
