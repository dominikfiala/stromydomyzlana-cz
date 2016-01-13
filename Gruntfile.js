module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ["./src/css/"]
        },
        files: {
          "./web/style.css": "./src/css/style.less"
        }
      },
      production: {
        options: {
          paths: ["./src/css/"],
          plugins: [
            new (require('less-plugin-autoprefix'))({
              browsers: ["last 3 versions"]
            }),
            new (require('less-plugin-clean-css'))()
          ]
        },
        files: {
          "./web/style.min.css": "./src/css/style.less"
        }
      }
    },
    watch: {
      files: "./src/css/*",
      tasks: ["newer:less:development"]
    },
    favicons: {
      options: {},
      icons: {
        src: 'src/gfx/icon.png',
        dest: 'web/gfx'
      }
    }
  });

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('favicon', ['newer:favicons']);
  grunt.registerTask('dev', ['newer:less:development']);
  grunt.registerTask('build', ['newer:favicons', 'newer:less:production']);
};