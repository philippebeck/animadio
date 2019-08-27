module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            options: {banner: "/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.homepage %> | <%= pkg.license %> License */\n\n", footer: "\n/*! Author: <%= pkg.author.name %> <<%= pkg.author.email %>>\n Updated: <%= grunt.template.today('dS mmm yyyy @ h:MM:ss TT') %> */"},
            main: {src: ["src/global/variables.css", "src/global/keyframes.css", "node_modules/normalize.css/normalize.css", "src/global/init.css", "src/global/box.css", "src/global/helpers.css", "src/grid/grid.css", "src/grid/flex.css", "src/grid/place.css", "src/elements/navbar.css", "src/elements/slider.css", "src/elements/btn.css", "src/elements/card.css", "src/elements/menu.css", "src/elements/gallery.css", "src/elements/table.css", "src/elements/form.css", "src/elements/foot.css", "src/states/display.css", "src/states/position.css", "src/states/bg.css", "src/states/color.css", "src/states/shabox.css", "src/states/shatex.css", "src/states/bord.css", "src/states/anima.css", "src/states/deco.css"], dest: "dist/animadio.css"},
            grid: {src: ["src/global/variables.css", "src/global/keyframes.css", "node_modules/normalize.css/normalize.css", "src/global/init.css", "src/global/box.css", "src/global/helpers.css", "src/grid/grid.css", "src/grid/flex.css", "src/grid/place.css"], dest: "dist/animadio-grid.css"},
            elements: {src: ["src/global/variables.css", "src/global/keyframes.css", "node_modules/normalize.css/normalize.css", "src/global/init.css", "src/global/box.css", "src/global/helpers.css", "src/elements/navbar.css", "src/elements/slider.css", "src/elements/btn.css", "src/elements/card.css", "src/elements/menu.css", "src/elements/gallery.css", "src/elements/table.css", "src/elements/form.css", "src/elements/foot.css"], dest: "dist/animadio-elements.css"},
            states: {src: ["src/global/variables.css", "src/global/keyframes.css", "node_modules/normalize.css/normalize.css", "src/global/init.css", "src/global/box.css", "src/global/helpers.css", "src/states/display.css", "src/states/position.css", "src/states/bg.css", "src/states/color.css", "src/states/shabox.css", "src/states/shatex.css", "src/states/bord.css", "src/states/anima.css", "src/states/deco.css"], dest: "dist/animadio-states.css"}},
        postcss: {options: {processors: [require("autoprefixer")({browsers: "last 2 versions"})]}, main: {src: "dist/animadio.css"}, grid: {src: "dist/animadio-grid.css"}, elements: {src: "dist/animadio-elements.css"}, states: {src: "dist/animadio-states.css"}},
        cssmin: {target: {files: [{"dist/min/animadio.min.css": ["dist/animadio.css"]}, {"dist/min/animadio-grid.min.css": ["dist/animadio-grid.css"]}, {"dist/min/animadio-elements.min.css": ["dist/animadio-elements.css"]}, {"dist/min/animadio-states.min.css": ["dist/animadio-states.css"]}]}}
    });
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.registerTask("default", ["concat", "postcss", "cssmin"]);
};