module.exports = {
  build: {
    files: {
      'build/favicon.ico':                 ['public/favicon.ico'],
      'build/static/css/lib/reset.css':    ['src/static/css/lib/reset.css'],
      'build/static/js/lib/require.js':    ['src/static/js/lib/require.js'],
      'build/static/js/lib/backbone.js':   ['src/static/js/lib/backbone.js'],
      'build/static/js/lib/jquery.js':     ['src/static/js/lib/jquery.js'],
      'build/static/js/lib/underscore.js': ['src/static/js/lib/underscore.js'],
      'build/static/js/lib/mustache.js':   ['src/static/js/lib/mustache.js'],
    }
  },
  build_html: {
    files: {
      'build/index.html': ['src/index.html'],
      'build/www/results.html': ['src/www/results.html'],
      'build/www/details.html': ['src/www/details.html'],
    }
  },
  build_scss: {
    files: {
      '.tmp/main.scss': ['src/static/css/custom/*.scss'],
    }
  },
  build_js_custom: {
    files: {
      // builds the js files
      './.tmp/js/compiled.js': [
        'src/static/js/collections/*.js',
        'src/static/js/models/*.js',
        'src/static/js/views/*.js'
      ]
    }
  },
  // dist: {
  //   files: {
  //     '.tmp/js/main.js': ['src/static/js/main.js', 'src/static/js/app.js', 'src/static/js/**/*.view.js', '!src/static/js/lib/*.js', 'src/**/*.collection.js', 'src/**/*.model.js'],
  //   }
  // },
}