module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            options: {
                banner: "/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.homepage %> | <%= pkg.license %> License */\n\n", 
                footer: "\n/*! Author: <%= pkg.author.name %> <<%= pkg.author.email %>>\n Updated: <%= grunt.template.today('dS mmm yyyy @ h:MM:ss TT') %> */"},
            css: {
                src: ["node_modules/normalize.css/normalize.css", "src/css/animadio.css"], 
                dest: "dist/animadio.css"},
            js: {
                src: ["src/js/Animadio.js", "src/js/Slider.js", "src/js/Canvas.js", "src/js/Ajax.js"],
                dest: "dist/animadio.js"}
            },
        postcss: {
            options: {
                processors: [require("autoprefixer")({overrideBrowserslist: "defaults"})]},
            css: { src: "dist/animadio.css" }
        },
        cssmin: {
            target: {
                files: [
                    { "dist/min/animadio.min.css": ["dist/animadio.css"] }
                ]
            }
        }
    });
    
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.registerTask("default", ["concat", "postcss", "cssmin"]);
};
