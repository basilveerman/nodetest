module.exports = function(grunt) {
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy-mm-dd") %> <%= pkg.author.name %> */\n',

        jshint: {
            files: ['Gruntfile.js', 'lib/*.js', 'tests/*.js']
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['tests/test*.js']
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

        // cssmin: {
        //     compress : {
        //         options: {
        //             banner: '<%= banner %>'
        //         },
        //         files : {
        //             'project.min.css': ['1.css', '2.css', '...']
        //         }
        //     }
        // },

        watch: {
            gruntfile: {
                files: '<%= jshint.files %>',
                tasks: ['jshint']
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('compress', 'uglify');
    grunt.registerTask('unittest', 'mochaTest');
    grunt.registerTask('test', ['jshint', 'mochaTest']);
    grunt.registerTask('default', 'test');
};