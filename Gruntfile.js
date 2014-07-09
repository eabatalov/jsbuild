module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');

    var srcFiles = [
        '<%= dirs.src %>assert.js',
        '<%= dirs.src %>json.js',
        '<%= dirs.src %>consts.js',
        '<%= dirs.src %>Module.js',
        '<%= dirs.src %>ModuleRepo.js',
        '<%= dirs.src %>modopts.js',
        '<%= dirs.src %>topsort.js',
        '<%= dirs.src %>npm.js',
        '<%= dirs.src %>grunt.js',
        '<%= dirs.src %>main.js'
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
            bin: 'bin/',
            src: 'src/',
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
                dest: '<%= dirs.bin %><%= files.out %>'
            }
        }
    });

    grunt.registerTask('default', ['concat']);
};
