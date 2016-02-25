module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            main: {
                src: [
                    'bower_components/requirejs/require.js',
                    'src/client/js/config.js',
                    'src/client/js/main.js'
                ],
                dest: 'src/client/js/main.build.js'
            }
        },

        copy: {
          main: {
            files: [
              {expand: true, flatten: true, src: ['src/client/index.html'], dest: 'build/client/'},
              {expand: true, flatten: true, src: ['src/client/css/style.css'], dest: 'build/client/css/'}
            ],
          },
        },

        requirejs: {
          compile: {
            options: {
              baseUrl: "src/client/js",
              mainConfigFile: "src/client/js/main.build.js",
              name: "main.build",
              out: "build/client/js/main.optimized.js",
              optimize: "none"
            }
          }
        },
        clean: ["src/client/js/main.build.js"]
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['concat', 'copy', 'requirejs', 'clean']);
};