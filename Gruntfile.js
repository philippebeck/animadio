module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                sourceMap: true,
                sourceMapName: 'dist/map/animadio.css.map',
                banner: '/* <%= pkg.name %> v<%= pkg.version %> | <%= pkg.homepage %> | <%= pkg.license %> License */\n\n',
                footer: '\n/* Author: <%= pkg.author.name %> <<%= pkg.author.email %>>\n Updated: <%= grunt.template.today("dS mmm yyyy @ h:MM:ss TT") %> */'
            },
            dist: {
                src: [
                    'node_modules/normalize.css/normalize.css',

                    'src/global/variables.css',
                    'src/global/keyframes.css',
                    'src/global/tags.css',
                    'src/global/display.css',

                    'src/helpers/show.css',
                    'src/helpers/spacing.css',
                    'src/helpers/border.css',
                    'src/helpers/size.css',
                    'src/helpers/text.css',
                    'src/helpers/color.css',
                    'src/helpers/shadow.css',

                    'src/elements/navbar.css',
                    'src/elements/button.css',
                    'src/elements/slider.css',
                    'src/elements/menu.css',
                    'src/elements/gallery.css',
                    'src/elements/table.css',
                    'src/elements/form.css',
                    'src/elements/footer.css',

                    'src/animations/name.css',
                    'src/animations/duration.css',
                    'src/animations/delay.css',
                    'src/animations/timing.css',
                    'src/animations/count.css',
                    'src/animations/direction.css',
                    'src/animations/fill.css',
                    'src/animations/origin.css'
                ],
                dest: 'dist/animadio.css'
            }
        },

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
                ]
            },
            dist: {
                src: 'dist/animadio.css'
            }
        },

        cssmin: {
            target: {
                files: [{
                    'dist/min/animadio.min.css': ['dist/animadio.css']
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    grunt.registerTask('default', ['concat', 'postcss', 'cssmin']);
};