// 安装插件
// 通过loadNpmTasks加载插件
// 通过initConfig添加插件配置选项

const sass = require("sass");
const loadGruntTasks = require("load-grunt-tasks");

module.exports = (grunt) => {
  grunt.initConfig({
    clean: {
      temp: "temp/*.txt",
    },
    sass: {
      options: {
        sourceMap: true,
        implementation: sass,
      },
      main: {
        files: {
          "dist/css/main.css": "src/scss/main.scss",
        },
      },
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"],
      },
      main: {
        files: {
          "dist/js/app.js": "src/js/app.js",
        },
      },
    },
    watch: {
      js: {
        files: ["src/js/*.js"],
        tasks: ["babel"],
      },
      css: {
        files: ["src/scss/*.scss"],
        tasks: ["sass"],
      },
    },
  });
  // grunt.loadNpmTasks("grunt-contrib-clean");
  // grunt.loadNpmTasks("grunt-sass");

  // 会自动加载所有插件任务
  loadGruntTasks(grunt);

  grunt.registerTask("default", ["sass", "babel", "watch"]);
};