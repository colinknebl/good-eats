module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),            
    babel: require('./.grunt/babel'),
    clean: require('./.grunt/clean'),
    concat: require('./.grunt/concat'),
    connect: require('./.grunt/connect'),
    sass: require('./.grunt/sass'),
    watch: require('./.grunt/watch'),
  })

  // Packages
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-connect')
  // grunt.loadNpmTasks('grunt-contrib-jshint') --> not installed

  // Registered Tasks
  // grunt.registerTask('default', ['concat', 'babel:dist'])
  grunt.registerTask('build', ['concat', 'babel', 'sass:build', 'connect', 'watch'])
  grunt.registerTask('dist', ['concat', 'babel:build', 'sass:build'])

}






