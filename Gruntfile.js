module.exports = function(grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat_css: {
            dist: {
                src: [
                    'node_modules/normalize.css/normalize.css',

                    'src/global/variables.css',
                    'src/global/keyframes.css',
                    'src/global/tags.css',
                    'src/global/display.css',
                    'src/global/helpers.css',

                    'src/elements/navbar.css',
                    'src/elements/button.css',
                    'src/elements/slider.css',
                    'src/elements/menu.css',
                    'src/elements/gallery.css',
                    'src/elements/table.css',
                    'src/elements/form.css',
                    'src/elements/footer.css'
                ],
                dest: 'dist/animadio.css'
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            your_target: {
                src: 'dist/animadio.css'
            },
        },

        cssmin: {
            target: {
                files: [{
                    'dist/min/animadio.min.css': ['dist/animadio.css']
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['concat_css', 'cssmin']);
};