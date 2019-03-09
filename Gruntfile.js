module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        concat: {
            options: {
                sourceMap: true,
                sourceMapName: "dist/map/animadio.css.map",
                banner: "/* <%= pkg.name %> v<%= pkg.version %> | <%= pkg.homepage %> | <%= pkg.license %> License */\n\n",
                footer: "\n/* Author: <%= pkg.author.name %> <<%= pkg.author.email %>>\n Updated: <%= grunt.template.today('dS mmm yyyy @ h:MM:ss TT') %> */"
            },
            dist: {
                src: [
                    "node_modules/normalize.css/normalize.css",

                    "src/variables/color-var.css",
                    "src/variables/spacing-var.css",
                    "src/variables/size-var.css",
                    "src/variables/animation-var.css",
                    "src/variables/transform-var.css",
                    "src/variables/tags-var.css",
                    "src/variables/navbar-var.css",

                    "src/border/bord-var.css",
                    "src/border/bord-global.css",
                    "src/border/bord-style.css",
                    "src/border/bord-width.css",
                    "src/border/bord-color.css",
                    "src/border/bord-radius.css",

                    "src/shadow/shadow-var.css",
                    "src/shadow/shabox.css",
                    "src/shadow/shabox-blur.css",
                    "src/shadow/shabox-spread.css",
                    "src/shadow/shatex.css",
                    "src/shadow/shatex-blur.css",

                    "src/global/grid.css",
                    "src/global/flexbox.css",
                    "src/global/tags.css",

                    "src/helpers/show.css",
                    "src/helpers/color.css",
                    "src/helpers/spacing.css",
                    "src/helpers/size.css",
                    "src/helpers/text.css",

                    "src/animations/keyframes.css",
                    "src/animations/name.css",
                    "src/animations/duration.css",
                    "src/animations/delay.css",
                    "src/animations/timing.css",
                    "src/animations/count.css",
                    "src/animations/direction.css",
                    "src/animations/fill.css",
                    "src/animations/origin.css",

                    "src/elements/navbar.css",
                    "src/elements/button.css",
                    "src/elements/slider.css",
                    "src/elements/menu.css",
                    "src/elements/gallery.css",
                    "src/elements/table.css",
                    "src/elements/form.css",
                    "src/elements/footer.css"
                ],
                dest: "dist/animadio.css"
            }
        },

        postcss: {
            options: {
                processors: [
                    require("autoprefixer")({browsers: "last 2 versions"}) // add vendor prefixes
                ]
            },
            dist: {
                src: "dist/animadio.css"
            }
        },

        cssmin: {
            target: {
                files: [{
                    "dist/min/animadio.min.css": ["dist/animadio.css"]
                }]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-contrib-cssmin");


    grunt.registerTask("default", ["concat", "postcss", "cssmin"]);
};