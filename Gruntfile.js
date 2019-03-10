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
                    /***** NORMALIZE *****/
                    "node_modules/normalize.css/normalize.css",

                    /***** GRID *****/
                    "src/grid/grid-var.css",
                    "src/grid/grid.css",
                    "src/grid/grid-tn.css",
                    "src/grid/grid-sm.css",
                    "src/grid/grid-md.css",
                    "src/grid/grid-lg.css",
                    "src/grid/grid-wd.css",
                    "src/grid/grid-gap.css",

                    /***** DISPLAY *****/
                    "src/display/flexbox.css",
                    "src/display/show.css",
                    "src/display/text.css",

                    /***** COLORS *****/
                    "src/colors/color-var.css",
                    "src/colors/color.css",
                    "src/colors/color-bg.css",

                    /***** SPACES *****/
                    "src/spaces/space.css",
                    "src/spaces/space-var.css",

                    /***** BORDERS *****/
                    "src/borders/bord-var.css",
                    "src/borders/bord-global.css",
                    "src/borders/bord-style.css",
                    "src/borders/bord-width.css",
                    "src/borders/bord-color.css",
                    "src/borders/bord-radius.css",

                    /***** SIZES *****/
                    "src/sizes/space-var.css",
                    "src/sizes/size-var.css",

                    /***** SHADOWS *****/
                    "src/shadows/shadows-var.css",
                    "src/shadows/shabox.css",
                    "src/shadows/shabox-blur.css",
                    "src/shadows/shabox-spread.css",
                    "src/shadows/shatex.css",
                    "src/shadows/shatex-blur.css",

                    /***** ANIMATIONS *****/
                    "src/animations/anima-var.css",
                    "src/animations/anima-keyframes.css",
                    "src/animations/anima-name.css",
                    "src/animations/anima-duration.css",
                    "src/animations/anima-delay.css",
                    "src/animations/anima-timing.css",
                    "src/animations/anima-count.css",
                    "src/animations/anima-direction.css",
                    "src/animations/anima-fill.css",
                    "src/animations/anima-origin.css",

                    /***** TAGS *****/
                    "src/tags/tag-var.css",
                    "src/tags/tag.css",

                    /***** NAVBAR *****/
                    "src/navbar/navbar-var.css",
                    "src/navbar/navbar.css",

                    /***** ELEMENTS *****/
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