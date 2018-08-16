module.exports = {
  build: {
    options: {
      style: 'expanded',
      // cacheLocation: '.tmp/.sass-cache',
    },
    files: {
      'build/static/css/compiled/main.css': '.tmp/main.scss',
    }
  },
  dist: {
    options: {
      style: 'compressed',
      // cacheLocation: '.tmp/.sass-cache',
      sourcemap: 'none',
    },
    files: {
      'dist/client/main.min.css': '.tmp/main.scss',
      'dist/client/lib/css/reset.min.css': 'src/static/css/lib/reset.css'
    }
  }
}