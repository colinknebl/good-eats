module.exports = {
  build: {
    options: {
      style: 'expanded',
      cacheLocation: '.tmp/.sass-cache',
    },
    files: {
      'build/static/css/compiled/main.css': '.tmp/main.scss',
    }
  },
  dist: {
    options: {
      style: 'compact',
      cacheLocation: '.tmp/.sass-cache',
    },
    files: {
      'dist/static/css/compiled/main.css': 'build/static/css/compiled/main.css',
    }
  }
}