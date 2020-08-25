'use strict';


const moment = require('moment');
const fs = require('fs');
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    eslint: {
      options: {
        configFile: 'packages/app/eslint.json',
        fix: grunt.option('fix') || false
      },
      jsFiles: [
        // @todo: Add linter for Gruntfile.js elsewhere if desired
        'Gruntfile.js',
        'packages/app/prod/'
      ]
    },

    tslint: {
      options: {
        configuration: 'packages/app/tslint.json',
        // If set to true, tslint errors will be reported, but not fail the task
        // If set to false, tslint errors will be reported, and the task will fail
        force: false,
        fix: grunt.option('fix') || false
      },
      tsFiles: [
        'packages/app/src/**/*.ts'
      ]
    },

    exec: {
      checkNpmVersion: {
        cmd: `npm -v | grep '6.9..*'`,
        cwd: `.`
      },
      checkNodeVersion: {
        cmd: `node -v | grep 'v10.16..*'`,
        cwd: `.`
      },
      runTest: {
        cmd: `CI=true npm --prefix packages/app run test`,
        cwd: `.`
      }
    }

  });
  
  grunt.registerTask('gitCommitHash', 'internal use task', function() {
    const exec = require('child_process').execSync;
    let hash = exec('git rev-parse --short HEAD').toString().trim();
    process.env.gitcommithash = hash;
  });

  grunt.registerTask('buildTokenPortalDockerImage', 'internal use for building token portal docker image ... ', function() {
    const done = this.async();
    const spawn = require('child_process').spawn;
    const child = spawn(`docker`, [
      'build',
      `--force-rm`,
      `--target`, `${ grunt.option('target') || 'final'}`,
      `--file`, `${ grunt.option('dockerfile') || 'Dockerfile'}`,
      `--build-arg`, `BUILD_DATE=${ moment.utc().format() }`,
      `--build-arg`, `COMMIT=${grunt.option('commit') || process.env.gitcommithash || '0000000'}`,
      `-t`, `${grunt.option('localdockerimage') || 'token-foundry/token-portal'}:${grunt.option('dockerimagetag') || process.env.gitcommithash || 'latest'}`,
      `.`
    ]);
    grunt.log.write(child.spawnargs);
    child.stdout.on('data', function(data) {
      grunt.log.write(data);
    });
    child.stderr.on('data', function(data) {
      grunt.log.error(data);
    });
    child.on('close', function(code) {
      grunt.log.writeln('closing code: ' + code);
      if( code === 0 ){
        done();
      }else{
        grunt.fail.fatal(code);  
      }
    });
  });


  grunt.registerTask('prepareIntegrationBuildOptions', 'internal use for devops to prepare intergration build ...', function() {
    let ibBuildOptions = {
      "mode": "container",
      "devops": {
        repo: 'git@github.ibm.com:icbi/devops.git',
        target: 'HEAD'
      },
      "chaincode": {
        repo: 'git@github.ibm.com:icbi/chaincode.git',
        target: 'HEAD'
      },
      "java-api": {
        repo: 'git@github.ibm.com:icbi/java-api.git',
        target: 'HEAD'
      },
      "frontend": {
        repo: 'git@github.ibm.com:icbi/frontend.git',
        target: 'HEAD'
      }
    };
    if( grunt.option('ghprbPullId') ){
      // I am a PR build, assume the ENV are set properly by ghprb jenkins plugin
      ibBuildOptions.mode = 'source';
      ibBuildOptions[`${grunt.option('gitRepository') || grunt.fail.fatal('gitRepository not set') }`].target = grunt.option('ghprbPullId');
      console.log(ibBuildOptions);
      if( grunt.option('ghprbPullLongDescription') ) {
        // for multi pr build
        let contents = grunt.option('ghprbPullLongDescription');
        console.log(contents);
        contents = contents.replace(/[\s]/gi, '');
        contents = contents.replace(/\\r\\n/gi, '');
        let json = contents.match(/\[\[(.+)\]\]/i);
        console.log(json);
        if( json ) {
          let multiPRInput = json[1];
          multiPRInput = multiPRInput.replace(/[']/gi, '"');
          multiPRInput = multiPRInput.replace(/[\\]/gi, '');
          multiPRInput = JSON.parse(multiPRInput);
          console.log(multiPRInput);
          ibBuildOptions['java-api'].target = multiPRInput.javaapirepopr || ibBuildOptions['java-api'].target;
          ibBuildOptions['devops'].target = multiPRInput.devopsrepopr || ibBuildOptions['devops'].target;
          ibBuildOptions['chaincode'].target = multiPRInput.ccrepopr || ibBuildOptions['chaincode'].target;
          ibBuildOptions['frontend'].target = multiPRInput.frontendrepopr || ibBuildOptions['frontend'].target;
        }
      }
    }
    // outputFile is integration build options
    let outputFile = grunt.option('outputFile') || undefined;
    let outStr = JSON.stringify(ibBuildOptions);
    console.log(outStr);
    if( outputFile ){
      // integrationBuildOptions=${integrationBuildOptions}
      fs.writeFileSync(outputFile, `integrationBuildOptions=${outStr}`);
    }
  });
  grunt.registerTask('test', 'test for token portal repo...', 
    [
      // To run tests, the versions must match. Dev machines without the right versions can't run the tests (run it elsewhere).
      'exec:checkNodeVersion',
      'exec:checkNpmVersion',
      'eslint',
      'tslint',
      'exec:runTest'
    ]
  );

  grunt.registerTask('build', 'build token portal docker image ...', 
    [
      // The below checks have been removed because the dev machine might be on a different version
      // 'exec:checkNodeVersion',
      // 'exec:checkNpmVersion',
      'eslint',
      'tslint',
      'gitCommitHash',
      'buildTokenPortalDockerImage'
    ]
  );
};
