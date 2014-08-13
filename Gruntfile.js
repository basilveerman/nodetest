"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy-mm-dd") %> <%= pkg.author.organization %> */\n',

        jshint: {
            files: ['Gruntfile.js', 'lib/*.js', 'tests/*.js'],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['tests/test*.js']
            }
        },

        browserify: {
            js: {
                src: '<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.js',
                options: {
                    bundleOptions: {
                        standalone: '<%= pkg.name %>'
                    }
                }
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.<%= pkg.version %>.min.js'
            }
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.files %>',
                tasks: ['jshint']
            }
        },
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('unittest', 'mochaTest');
    grunt.registerTask('test', ['jshint', 'mochaTest']);
    grunt.registerTask('build', ['jshint', 'mochaTest', 'browserify', 'uglify']);
    grunt.registerTask('default', 'build');
};