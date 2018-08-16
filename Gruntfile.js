module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),            
    babel: require('./.grunt/babel'),
    clean: require('./.grunt/clean'),
    concat: require('./.grunt/concat'),
    connect: require('./.grunt/connect'),
    sass: require('./.grunt/sass'),
    watch: require('./.grunt/watch'),
    processhtml: require('./.grunt/processHtml'),
    copy: require('./.grunt/copy')
  })

  // Packages
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-processhtml')

  // Registered Tasks
  grunt.registerTask('build-watch', ['concat', 'babel', 'sass:build', 'copy:templates', 'connect', 'watch'])
  grunt.registerTask('build', [
    'concat:build', 'concat:build_html', 'concat:build_scss', 'concat:build_js_custom', 
    'babel:build_custom', 'babel:build_main', 'babel:build_app', 
    'sass:build', 'copy:templates',])
  // grunt.registerTask('dist', ['concat:dist', 'processhtml:dist', 'sass:dist'])
  grunt.registerTask('dist', ['processhtml:dist', 'copy:dist', 'concat:dist', 'babel:dist', 'sass:dist'])

}






