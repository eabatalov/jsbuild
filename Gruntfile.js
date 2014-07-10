module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');

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
        }
    });

    grunt.registerTask('default', ['concat']);
};
