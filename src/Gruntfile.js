module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    uglify: {
      options: {
        mangle: false,
        sourceMap: true
      },
      build: {
        files: {
          './public/scripts/main.min.js': ['./public/scripts/jquery.min.js',
            './public/scripts/handlebars.min.js',
            './public/scripts/helpers.js',
            './public/scripts/templates.js',
            './public/scripts/materialstyle.min.js',
            './public/scripts/mdc.ripple.min.js',
            './public/scripts/popper.min.js',
            './public/scripts/main.js'
          ]
        }
      }
    },
    eslint: {
      options: {
        overrideConfigFile: './eslint.config.mjs',
        warnIgnored: false
      },
      target: ["./app.js", "./index.js", "./oidchelper.js", "./logger.js", "**/helpers/*.js", "**/routes/*.js", "**/services/*.js", "**/public/*.js"]
    },
    handlebars: {
      all: {
        files: {
          "public/scripts/templates.js": ["views/**/*.hbs"]
        }
      }
    },
    'npm-command': {
      dev: {
        options: {
          cmd: 'run',
          args: ['start-dev']
        }
      },
      prod: {
        options: {
          cmd: 'run',
          args: ['start']
        }
      }
    },
    env: {
      options: {
        //Shared Options Hash
      },
      dev: {
        NODE_ENV: 'development',
        API_INTERNAL_URL: 'http://thecrockers.localcert.net:9080/api',
        PERSISTENCE_STORE: '/home/jcrocker/src/dev/labortablo/cache',
        NODE_CONFIG_DIR: '/home/jcrocker/src/dev/labortablo/config'
      }
    },
    shell: {
      prettify: {
        command: 'find . -type f -name "*.hbs" -exec npx js-beautify -r --templating handlebars -s 2 -n -w 0 --type html -j {} +'
      },
      jsprettify: {
        command: 'find . -type f -name "*.js" -not -path "**/node_modules/*" -exec npx js-beautify -s 2 -n -w 0 --type js {} +'
      },
      cssprettify: {
        command: 'find . -type f -name "*.css" -not -path "**/node_modules/*" -exec npx js-beautify -r -s 2 -n -w 0 --type css {} +'
      },
      prebuild: {
        command: 'npm version prepatch'
      },
      build: {
        command: [
          'npm version patch',
          'docker buildx create --name labortablo-builder --node labortablo-builder --platform linux/arm64 --use --bootstrap',
          'docker buildx prune --builder labortablo-builder -f',
          'docker buildx build --pull --no-cache --load --platform linux/arm64 --builder labortablo-builder -t "guidcruncher/labortablo:development" .',
          'docker push "guidcruncher/labortablo:development"',
          'docker buildx rm labortablo-builder -f'
        ].join(' && ')
      },
      publish: {
        command: [
          'npm version minor',
          'docker buildx create --name labortablo-builder --node labortablo-builder --platform linux/arm64,linux/amd64  --use --bootstrap',
          'docker buildx prune --builder labortablo-builder -f',
          'docker buildx build --pull --no-cache --platform linux/arm64,linux/amd64 --builder labortablo-builder -t "guidcruncher/labortablo:latest" --push .',
          'docker push "guidcruncher/labortablo:latest"',
          'docker buildx rm labortablo-builder -f'
        ].join(' && ')
      },
      deploy: {
        command: [
          'docker stop labortablo',
          'docker pull guidcruncher/labortablo:development',
          'docker start labortablo'
        ].join(' && ')
      }
    }
  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-npm-command');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-shell');


  // Default task(s).
  grunt.registerTask('default', ['package', 'shell:prebuild', 'npm-command:dev']);
  grunt.registerTask('package', ['env:dev', 'shell:cssprettify', 'shell:jsprettify', 'shell:prettify', 'handlebars', 'eslint', 'uglify']);
  grunt.registerTask('build', ['shell:build']);
  grunt.registerTask('build-deploy', ['build', 'deploy']);
  grunt.registerTask('deploy', ['shell:deploy']);
  grunt.registerTask('publish', ['shell:publish']);
};
