module.exports = function(grunt) {
    
    var buildPath = grunt.option('buildPath') || './build',
		tempPath = grunt.option('tempPath') || './temp';

    grunt.initConfig({
        buildPath: buildPath,
        tempPath: tempPath,
        
        pkg: grunt.file.readJSON('package.json'),
        // TODO: update jshint options
        jshint: {
            options: {
                curly: true,
                camelcase: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                
                browser: true,
                globals: {
                
                }
            },
            sources: {
                src: ['<%= buildPath %>/knockstrap.js']
            }
        },
        
        concat: {
            bindings: {
                src: ['src/bindings/*.js'],
                dest: '<%= tempPath %>/bindings.js'
            },
            utils: {
                src: ['src/utils/*.js'],
                dest: '<%= tempPath %>/utils.js'
            }
        },

        templates_concat: {
            options: {
                namespace: 'templates'
            },
            dist: {
                'src': ['src/templates/*.html'],
                'dest': '<%= tempPath %>/compiledTemplates.js'
            }
        },

        copy: {
            templates: {
                files: [{ expand: true, src: ['src/templates/templatesWrapper.js'], dest: '<%= tempPath %>/', flatten: true },
                        { expand: true, src: ['src/main.js'], dest: '<%= tempPath %>/', flatten: true }]
            }
        },

        clean: {
            build: ['<%= buildPath %>'],
            temp: ['<%= tempPath %>']
        },
        
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            release: {
                files: {
                    '<%= buildPath %>/knockstrap.min.js': ['<%= buildPath %>/knockstrap.js']
                }
            }
        },

        directives: {
            templates: {
                src: ['<%= tempPath %>/templatesWrapper.js'],
                dest: '<%= tempPath %>/templates.js'
            },
            
            all: {
                src: ['<%= tempPath %>/main.js'],
                dest: '<%= buildPath %>/knockstrap.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-templates-concat');
    grunt.loadNpmTasks('grunt-directives');
    
    grunt.registerTask('default', ['clean', 'templates_concat', 'copy', 'concat', 'directives', 'uglify', 'clean:temp', 'jshint']);
}