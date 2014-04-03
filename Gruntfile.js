module.exports = function(grunt) {
    
    var buildPath = grunt.option('buildPath') || './build',
		tempPath = grunt.option('tempPath') || './temp',
        examplesPath = grunt.option('examplesPath') || './examples';

    grunt.initConfig({
        buildPath: buildPath,
        tempPath: tempPath,
        examplesPath: examplesPath,
        fileHeader: '/*! <%= pkg.name %> <%= pkg.version %> | (c) 2013 <%= pkg.author %> |  http://www.opensource.org/licenses/mit-license */\n',

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
                'src': ['src/templates/**/*.html'],
                'dest': '<%= tempPath %>/compiledTemplates.js'
            }
        },

        copy: {
            templates: {
                expand: true,
                src: ['src/templates/templatesWrapper.js', 'src/main.js'],
                dest: '<%= tempPath %>/',
                flatten: true
            },
            
            examples: {
                expand: true,
                cwd: 'examples-src',
                src: ['css/*', 'js/*'],
                dest: '<%= examplesPath %>/'
            }
        },

        clean: {
            build: ['<%= buildPath %>'],
            temp: ['<%= tempPath %>'],
            examples: ['<%= examplesPath %>']
        },
        
        uglify: {
            options: {
                banner: '<%= fileHeader %>'
            },
            release: {
                files: {
                    '<%= buildPath %>/knockstrap.min.js': ['<%= buildPath %>/knockstrap.js']
                }
            }
        },

        preprocess: {
            templates: {
                src: '<%= tempPath %>/templatesWrapper.js',
                dest: '<%= tempPath %>/templates.js'
            },

            main: {
                options: {
                    context: {
                        header: '<%= fileHeader %>'
                    }  
                },

                src: '<%= tempPath %>/main.js',
                dest: '<%= buildPath %>/knockstrap.js'
            },

            examples: {
                files: {
                    '<%= examplesPath %>/index.html': 'examples-src/index.html',
                    '<%= examplesPath %>/examples.html': 'examples-src/examples.html'
                }
            }
        },

        nugetpack: {
            release: {
                src: 'knockstrap.nuspec',
                dest: 'build/',

                options: {
                    version: '<%= pkg.version %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-templates-concat');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-nuget');
    
    grunt.registerTask('default', ['clean:build', 'templates_concat', 'copy:templates', 'concat', 'preprocess:templates', 'preprocess:main', 'uglify', 'clean:temp', 'jshint']);
    grunt.registerTask('examples', ['clean:examples', 'preprocess:examples', 'copy:examples']);
    grunt.registerTask('nuget', ['default', 'nugetpack']);
}