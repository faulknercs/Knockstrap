module.exports = function(grunt) {
    
    var buildPath = grunt.option('buildPath') || './build',
		tempPath = grunt.option('tempPath') || './temp',
        examplesPath = grunt.option('examplesPath') || './examples';

    grunt.initConfig({
        buildPath: buildPath,
        tempPath: tempPath,
        examplesPath: examplesPath,
        fileHeader: '/*! <%= pkg.name %> <%= pkg.version %> | (c) 2014 <%= pkg.author %> |  http://www.opensource.org/licenses/mit-license */\n',

        pkg: grunt.file.readJSON('package.json'),
        
        jshint: {
            options: {
                curly: true,
                camelcase: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                strict: true,
                undef: true,
                unused: true,
                browser: true,
                globals: {
                    $: false,
                    ko: false,
                    require: false,
                    exports: false,
                    define: false
                },
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
                files: [
                    { expand: true, cwd: 'examples-src', src: ['css/*', 'js/*'], dest: '<%= examplesPath %>/' },
                    { expand: true, flatten: true, src: ['build/*'], dest: '<%= examplesPath %>/js/' }
                ]
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
                options: {
                    context: {
                        knockstrap: 'js/knockstrap.js'
                    }
                },
                files: {
                    '<%= examplesPath %>/index.html': 'examples-src/index.html',
                    '<%= examplesPath %>/examples.html': 'examples-src/examples.html'
                }
            },
            
            examplesRelease: {
                options: {
                    context: {
                        knockstrap: 'js/knockstrap.min.js'
                    }
                },
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
        },
        
        jasmine: {
            test: {
                src: 'build/knockstrap.js',
                options: {
                    specs: ['tests/utilsBehaviors.js', 'tests/bindings/*.js'],
                    vendor: [
                        'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',
                        'http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js',
                        'http://cdnjs.cloudflare.com/ajax/libs/knockout/3.0.0/knockout-min.js'
                    ],
                    helpers: [
                        'tests/jasmineExtensions.js',
                        'http://rawgithub.com/velesin/jasmine-jquery/master/lib/jasmine-jquery.js'
                    ],
                    styles: 'http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-templates-concat');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-nuget');
    
    grunt.registerTask('default', ['clean:build', 'templates_concat', 'copy:templates', 'concat', 'preprocess:templates', 'preprocess:main', 'clean:temp', 'jshint']);
    grunt.registerTask('release', ['default', 'jasmine', 'uglify']);
    
    grunt.registerTask('examples', ['default', 'clean:examples', 'preprocess:examples', 'copy:examples']);
    grunt.registerTask('examples-release', ['release', 'clean:examples', 'preprocess:examplesRelease', 'copy:examples']);
    
    grunt.registerTask('nuget', ['release', 'nugetpack']);
    grunt.registerTask('travis', ['default', 'jasmine']);
}