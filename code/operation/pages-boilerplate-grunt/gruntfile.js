const cwd = process.cwd();
const sass = require("sass");
const loadConfig = require(`${cwd}/pages.config.js`);
const loadGruntTasks = require("load-grunt-tasks");

module.exports = (grunt) => {
  grunt.initConfig({
    clean: {
      dist: "dist/*",
      temp: "temp/*",
    },
    sass: {
      options: {
        sourceMap: true,
        implementation: sass,
      },
      main: {
        files: [{
          expand: true,
          cwd: "src/assets/styles/",
          src: ["*.scss"],
          dest: "temp/assets/styles/",
          ext: ".css",
        }, ],
      },
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"],
      },
      main: {
        files: [{
          expand: true,
          cwd: "src/assets/scripts/",
          src: ["*.js"],
          dest: "temp/assets/scripts/",
        }, ],
      },
    },
    useref: {
      html: "temp/*.html",
      temp: "temp",
    },
    swig: {
      options: {
        data: {
          ...loadConfig,
        },
      },
      target: {
        files: [{
          expand: true,
          cwd: "src/",
          dest: "temp/",
          src: ["*.html"],
        }, ],
      },
    },
    // cssmin: {
    //   target: {
    //     options: {
    //       mergeIntoShorthands: false,
    //       roundingPrecision: -1,
    //     },
    //     files: [
    //       {
    //         expand: true,
    //         cwd: "temp/assets/styles/",
    //         src: ["*.css", "!*.min.css"],
    //         dest: "dist/assets/styles/",
    //         ext: ".min.css",
    //       },
    //     ],
    //   },
    // },
    // uglify: {
    //   options: {
    //     mangle: true,
    //     comments: "false",
    //   },
    //   target: {
    //     files: [
    //       {
    //         expand: true,
    //         cwd: "temp/assets/scripts/",
    //         src: ["**/*.js"],
    //         dest: "dist/assets/scripts/",
    //       },
    //     ],
    //   },
    // },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
        },
        files: [{
          expand: true,
          cwd: "temp",
          src: ["*.html"],
          dest: "dist",
        }, ],
      },
    },
    copy: {
      temp: {
        files: [{
            expand: true,
            src: ["src/assets/fonts/*"],
            dest: "temp/assets/fonts/",
          },
          {
            expand: true,
            src: ["src/assets/images/*"],
            dest: "temp/assets/images/",
          },
          {
            expand: true,
            cwd: "public/",
            src: ["**"],
            dest: "temp/",
          },
        ],
      },
      dist: {
        files: [{
            expand: true,
            src: ["src/assets/fonts/*"],
            dest: "dist/assets/fonts/",
          },
          {
            expand: true,
            src: ["src/assets/images/*"],
            dest: "dist/assets/images/",
          },
          {
            expand: true,
            cwd: "public/",
            src: ["**"],
            dest: "dist/",
          },
        ],
      },
    },
    watch: {
      livereload: {
        options: {
          livereload: "<%=connect.options.livereload%>",
        },
        files: [
          "temp/*.html",
          "temp/assets/styles/*.css",
          "temp/assets/scripts/*.js",
          "temp/assets/images/*",
          "temp/assets/fonts/*",
        ],
      },
      js: {
        files: ["src/assets/scripts/*.js"],
        tasks: ["babel"],
      },
      css: {
        files: ["src/assets/styles/*.scss"],
        tasks: ["sass"],
      },
    },
    connect: {
      options: {
        port: 2333,
        hostname: "127.0.0.1",
        livereload: 35729,
      },
      server: {
        options: {
          open: true,
          base: ["temp"],
          routes: {
            "/node_modules": "node_modules",
          },
        },
      },
    },
  });

  // 会自动加载所有插件任务
  loadGruntTasks(grunt);

  grunt.registerTask('hack_useref', function () {
    const concatConfig = grunt.config('concat')

    function repalceNodeModules() {
      return Reflect.ownKeys(concatConfig).reduce((p, c) => {
        const currentValue = concatConfig[c]
        const nextValue = currentValue.map((v) =>
          v.includes('node_modules') ? v.replace('temp/', '') : v
        )
        return {
          ...p,
          [c]: nextValue
        }
      }, {})
    }
    grunt.config('concat', repalceNodeModules())
  })

  grunt.registerTask("complie", [
    "clean:temp",
    "sass",
    "babel",
    "swig",
    "useref",
    "hack_useref",
    "concat",
    "copy:temp",
  ]);

  grunt.registerTask("build", [
    "clean:dist",
    "complie",
    "cssmin",
    "uglify",
    "htmlmin",
    "copy:dist",
  ]);

  grunt.registerTask("serve", ["complie", "connect", "watch"]);
};
