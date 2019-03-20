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
                src: ["node_modules/normalize.css/normalize.css", "src/global/keyframes.css", "src/global/tags.css", "src/global/space.css", "src/global/size.css", "src/global/helpers.css", "src/medias/grid.css", "src/medias/flex.css", "src/medias/align.css", "src/medias/justify.css", "src/poly/display.css", "src/poly/position.css", "src/poly/flow.css", "src/concat/color.css", "src/concat/shabox.css", "src/concat/shatex.css", "src/states/bord.css", "src/states/anima.css", "src/states/deco.css", "src/elements/navbar.css", "src/elements/btn.css", "src/elements/slider.css", "src/elements/menu.css", "src/elements/gallery.css", "src/elements/table.css", "src/elements/form.css", "src/elements/foot.css"],
                dest: "dist/animadio.css"}},
        postcss: {options: {processors: [require("autoprefixer")({browsers: "last 2 versions"})]}, dist: {src: "dist/animadio.css"}},
        cssmin: {target: {files: [{"dist/min/animadio.min.css": ["dist/animadio.css"]}]}}
    });
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.registerTask("default", ["concat", "postcss", "cssmin"]);
};