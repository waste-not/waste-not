'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');

const scripts = ['server.js', 'lib/**/*.js', 'models/**/*.js', 'routes/**/*.js',
  'client/**/*.js?(x)', '!**/*bundle.js'];
const clientScripts = ['client/**/*.js?(x)'];
const staticFiles = ['client/**/*.html', 'client/**/*.png', 'client/**/*.jpg',
  'client/**/*.csv'];

gulp.task('static:dev', () => {
  return gulp.src(staticFiles, { 'base': 'client' })
    .pipe(gulp.dest('dist/'));
});

gulp.task('webfonts:dev', () => {
  return gulp.src('client/webfonts/**/*')
    .pipe(gulp.dest('dist/webfonts'));
});

gulp.task('sass:dev', () => {
  return gulp.src('client/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
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
  gulp.watch('client/sass/*.sass', ['sass:dev']);
});

gulp.task('dev', ['static:dev', 'build:dev', 'sass:dev', 'webfonts:dev']);
gulp.task('style:dev', ['static:dev', 'sass:dev', 'webfonts:dev']);

gulp.task('default', ['dev', 'lint']);
