module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            options: {banner: "/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.homepage %> | <%= pkg.license %> License */\n\n", footer: "\n/*! Author: <%= pkg.author.name %> <<%= pkg.author.email %>>\n Updated: <%= grunt.template.today('dS mmm yyyy @ h:MM:ss TT') %> */"},
            main: {src: ["src/css/animadio.css"], dest: "dist/animadio.css"},
            box: {src: ["src/css/animadio-box.css"], dest: "dist/animadio-box.css"},
            grid: {src: ["src/css/animadio-grid.css"], dest: "dist/animadio-grid.css"},
            elements: {src: ["src/css/animadio-elements.css"], dest: "dist/animadio-elements.css"},
            states: {src: ["src/css/animadio-states.css"], dest: "dist/animadio-states.css"},
            helpers: {src: ["src/css/animadio-helpers.css"], dest: "dist/animadio-helpers.css"},
            events: {src: ["src/css/animadio-events.css"], dest: "dist/animadio-events.css"}},
        postcss: {
            options: {processors: [require("autoprefixer")({browsers: "last 2 versions"})]},
            main: {src: "dist/animadio.css"},
            box: {src: "dist/animadio-box.css"},
            grid: {src: "dist/animadio-grid.css"},
            elements: {src: "dist/animadio-elements.css"},
            states: {src: "dist/animadio-states.css"},
            helpers: {src: "dist/animadio-helpers.css"},
            events: {src: "dist/animadio-events.css"}},
        cssmin: {
            target: {files: [{"dist/min/animadio.min.css": ["dist/animadio.css"]},
                    {"dist/min/animadio-box.min.css": ["dist/animadio-box.css"]},
                    {"dist/min/animadio-grid.min.css": ["dist/animadio-grid.css"]},
                    {"dist/min/animadio-elements.min.css": ["dist/animadio-elements.css"]},
                    {"dist/min/animadio-states.min.css": ["dist/animadio-states.css"]},
                    {"dist/min/animadio-helpers.min.css": ["dist/animadio-helpers.css"]},
                    {"dist/min/animadio-events.min.css": ["dist/animadio-events.css"]}]}}
    });
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.registerTask("default", ["concat", "postcss", "cssmin"]);
};