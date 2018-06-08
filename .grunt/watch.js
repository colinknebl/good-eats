module.exports = {
  options: {
    livereload: true,
  },
  html: {
    files: ['src/index.html', 'src/www/*.html'],
    tasks: ['concat:build_html'],
  },
  js_custom: {
    files: [
      'src/static/js/collections/*.js',
      'src/static/js/models/*.js',
      'src/static/js/views/*.js'
    ],
    tasks: ['concat:build_js_custom', 'babel:build_custom'],
  },
  js_app: {
    files: ['src/static/js/app.js'],
    tasks: ['babel:build_app'],
  },
  js_main: {
    files: ['src/static/js/main.js'],
    tasks: ['babel:build_main'],
  },
  js_router: {
    files: ['src/static/js/router.js'],
    tasks: ['babel:build_router'],
  },
  scss: {
    // watches for file changes in the src folder, outputs changes in .tmp folder
    files: ['src/static/css/custom/*.scss'],
    tasks: ['concat:build_scss', 'sass:build'],
  },
  css: {
    // watches for changes in .misc folder, outputs changes to build folder
    files: ['.misc/main.scss'],
    tasks: ['sass:build'],
  },
}