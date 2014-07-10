module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    var srcFiles = [
        '<%= dirs.in %>assert.js',
        '<%= dirs.in %>json.js',
        '<%= dirs.in %>consts.js',
        '<%= dirs.in %>Module.js',
        '<%= dirs.in %>ModuleRepo.js',
        '<%= dirs.in %>modopts.js',
        '<%= dirs.in %>topsort.js',
        '<%= dirs.in %>npm.js',
        '<%= dirs.in %>grunt.js',
        '<%= dirs.in %>main.js'
    ];
    var filesToCopy = [
        { expand: true, flatten: true, src: '<%= dirs.in %>gruntfile_template.txt', dest: '<%= dirs.out %>' }
    ];

    banner = [
        '/**',
        ' * <%= pkg.name %> - v<%= pkg.version %>',
        ' *',
        ' * <%= pkg.description %>',
        ' *',
        ' * MIT license',
        ' *',
        ' * Copyright (c) 2014, Eugene Batalov <eabatalov89@gmail.com>',
        ' * <%= pkg.homepage %>',
        ' *',
        ' * Compiled: <%= grunt.template.today("yyyy-mm-dd") %>',
        ' *',
        ' */',
        ''].join('\n');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            'out': 'bin/',
            'in': 'src/',
        },

        files : {
            out : 'main.js',
        },

        concat: {
            options: {
                stripBanners: true,
                banner: banner,
                separator: grunt.util.linefeed
            },

            out: {
                src: srcFiles,
                dest: '<%= dirs.out %><%= files.out %>'
            }
        },

        copy: {
            options: {
                mode: true
            },
            all: {
                files: filesToCopy
            }
        },
    });

    grunt.registerTask('default', ['concat', 'copy']);
};
