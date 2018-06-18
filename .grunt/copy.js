module.exports = {
  dist: {
    files: [
      {
        expand: true,
        src: ['package.json'],
        dest: 'dist/',
      },
      {
        expand: true,
        cwd: 'src/',
        src: [
          'favicon.ico',
          'static/assets/**',
        ],
        dest: 'dist/client/',
      },
      {
        expand: true,
        cwd: 'src/static/js/lib',
        src: ['*'],
        dest: 'dist/client/lib/js/'
      },
      {
        expand: true,
        src: ['scripts/startProdServer.sh'],
        dest: 'dist/'
      },
      {
        expand: true,
        src: ['server/server.js'],
        dest: 'dist/'
      }
    ]
  }
}