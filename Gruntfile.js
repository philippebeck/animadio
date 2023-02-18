module.exports = function(grunt) {
  const sass = require('node-sass');
  
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    sass: {
      options: {
        implementation: sass,
        sourceMap: false
      },
      dist: {
        files: {
          'src/main.css': 'src/main.scss',
          'dist/style.css': 'src/style.scss'
        }
      }
    },
    concat: {
      options: {
        banner: "/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.homepage %> | <%= pkg.license %> License */\n\n", 
        footer: "\n/* Author: <%= pkg.author.name %> <<%= pkg.author.email %>>\n Updated: <%= grunt.template.today('dS mmm yyyy @ h:MM:ss TT') %> */"
      },
      css: {
        src: ["node_modules/normalize.css/normalize.css", "src/css/main.css"], 
        dest: "dist/animadio.css"
      }
    },
    postcss: {
      options: { processors: [require("autoprefixer")({overrideBrowserslist: "defaults"})] },
      css: { src: "dist/animadio.css" }
    },
    cssmin: {
      target: {
        files: [
          { "dist/animadio.min.css": ["dist/animadio.css"] }
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.registerTask("default", ["sass", "concat", "postcss", "cssmin"]);
};
