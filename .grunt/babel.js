module.exports = {
  options: {
    sourceMaps: false,
    minified: false,
    comments: true,
    babelrc: false,
    presets: ['env']
  },
  build_custom: {
    files: {
      // watches for files changes in .misc folder, outputs changes to build folder
      'build/static/js/custom/scripts.js': '.tmp/js/compiled.js',
    }
  },
  build_main: {
    files: {
      'build/static/js/main.js': 'src/static/js/main.js',
    }
  },
  build_app: {
    files: {
      'build/static/js/app.js': 'src/static/js/app.js'
    }
  },
  build_router: {
    files: {
      'build/static/js/router.js': 'src/static/js/router.js'
    }
  }
}