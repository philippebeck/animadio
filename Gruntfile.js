module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            options: {banner: "/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.homepage %> | <%= pkg.license %> License */\n\n", footer: "\n/*! Author: <%= pkg.author.name %> <<%= pkg.author.email %>>\n Updated: <%= grunt.template.today('dS mmm yyyy @ h:MM:ss TT') %> */"},
            main: {src: ["src/css/animadio.css"], dest: "dist/animadio.css"},
            grid: {src: ["src/css/animadio-grid.css"], dest: "dist/animadio-grid.css"},
            elements: {src: ["src/css/animadio-elements.css"], dest: "dist/animadio-elements.css"},
            states: {src: ["src/css/animadio-states.css"], dest: "dist/animadio-states.css"}},
        postcss: {options: {processors: [require("autoprefixer")({browsers: "last 2 versions"})]}, main: {src: "dist/animadio.css"}, grid: {src: "dist/animadio-grid.css"}, elements: {src: "dist/animadio-elements.css"}, states: {src: "dist/animadio-states.css"}},
        cssmin: {target: {files: [{"dist/min/animadio.min.css": ["dist/animadio.css"]}, {"dist/min/animadio-grid.min.css": ["dist/animadio-variables.css"]}, {"dist/min/animadio-elements.min.css": ["dist/animadio-variables.css"]}, {"dist/min/animadio-states.min.css": ["dist/animadio-variables.css"]}]}}
    });
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.registerTask("default", ["concat", "postcss", "cssmin"]);
};