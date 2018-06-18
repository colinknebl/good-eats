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
      'build/static/js/main.js': 'src/static/js/main.dev.js',
    }
  },
  build_app: {
    files: {
      'build/static/js/app.js': 'src/static/js/app.js'
    }
  },
  dist: {
    options: {
      sourceMaps: false,
      minified: true,
      comments: false,
      babelrc: false,
      presets: ['env']
    },
    files: {
      'dist/client/main.min.js': '.tmp/src.js',
    }
  }
}