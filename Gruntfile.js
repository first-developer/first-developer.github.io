/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    app: grunt.file.readJSON('package.json'),
    banner: '/*! <%= app.title || app.name %> - v<%= app.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= app.homepage ? "* " + app.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= app.author.name %>;' +
      ' Licensed <%= _.pluck(app.licenses, "type").join(", ") %> */\n',
    // Task configuration.

    // ----------------------------------
    // COMPASS
    // ----------------------------------
    compass: {
      dist: {
        options: {
          require       : ['compass', 'animate'],
          config        : '<%= app.config.compass %>',
          sassDir       : '<%= app.dev.styles %>',
          cssDir        : '<%= app.prod.styles %>',
          imagesDir     : '<%= app.prod.img %>',
          javascriptsDir: '<%= app.prod.scripts %>',
          fontsDir      : '<%= app.prod.fonts %>'
        }
      }
    },

    // ----------------------------------
    // CONCAT
    // ----------------------------------

    // ----------------------------------
    // UGLIFY
    // ----------------------------------

    // ----------------------------------
    // JSHINT
    // ----------------------------------
    jshint: {
      options: {
        curly   : true,
        eqeqeq  : true,
        immed   : true,
        latedef : true,
        newcap  : true,
        noarg   : true,
        sub     : true,
        undef   : true,
        unused  : true,
        boss    : true,
        eqnull  : true,
        browser : true,
        globals : {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      tests: {
        src: ['<%= app.libs %>/**/*.js', 
              '<%= app.vendors %>/**/*.js', 
              '<%= app.tests %>/**/*.js']
      }
    },

    // ----------------------------------
    // COFFEE
    // ----------------------------------
    
    coffee: {
      app : {
        expand  : true,
        flatten : true,
        cwd     : '<%= app.dev.scripts %>',
        src     : ['**/*.coffee'],
        dest    : '<%= app.prod.scripts %>',
        ext     : '.js'
      },

      tests : {
        expand  : true,
        flatten : true,
        cwd     : '<%= app.tests %>/coffee',
        src     : ['**/*.coffee'],
        dest    : '<%= app.tests %>/js',
        ext     : '.js'
      }
    }


    // ----------------------------------
    // REQUIRE.JS
    // ----------------------------------

    requirejs: {
      compile: {
        options: {
          baseUrl                 : "<%= app.config.requirejs %>",
          mainConfigFile          : "<%= app.config.requirejs %>/main.js",
          out                     : "<%= app.prod.js %>/build.js",
          preserveLicenseComments : false,
          useStrict               : true,
          wrap                    : true
        }
      }
    }


    // ----------------------------------
    // WATCH
    // ----------------------------------
    
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      tests: {
        files: '<%= jshint.tests.src %>',
        tasks: ['jshint:tests']
      },

      styles: {
        files: ['<%= app.dev.styles %>/**/*.scss'],
        tasks: ['compass']
      },

      coffee : {
        files : '<%= app.dev.scripts %>/**/*.coffee',
        tasks : ['coffee']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Default task.
  grunt.registerTask('default', [ 'jshint', 
                                  'concat', 
                                  'uglify']);

};
