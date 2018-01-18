var gulp = require('gulp')
var minimist = require('minimist')

let defaultParams = function () {
  addDefaultParam('dateTo', '2018-01-01')
  addDefaultParam('dateFrom', '2017-01-01')
  addDefaultParam('minWordCount', '2')
  // Just used for system-evolution-analysis
  //addDefaultParam('timeSplit', 'eom')
  //addDefaultParam('layerGroup', 'main')

  const params = minimist(process.argv)
  console.log('Running with params ', params)
}

function addDefaultParam(paramName, defaultValue) {
  var params = minimist(process.argv)
  if (!params.hasOwnProperty(paramName))
    process.argv.push('--' + paramName + '=' + defaultValue)
}

defaultParams()

require('code-forensics').configure(
  {
    repository: {
      rootPath: "../vue",
      includePaths: [
        './src/',
        './test/',
        // './config'
      ],
      excludePaths: [
        '**/+(*.jpg|*.png|*.gif)',
        './node_modules',
        './tmp'
      ],
    },
    languages: ["javascript"],
    contributors: {
      'Official Members': [
        ['Evan You', 'YOU'],
        ['Eduardo San Martin Morote'],
        ['katashin'],
        ['Chris Fritz'],
        ['Blake Newman'],
        ['kazuya kawaguchi'],
        ['chengchao']
      ],
      'External': [
        ['Hanks'],
        ['AchillesJ'],
        ['Herrington Darkholme'],
        ['JK'],
        ['Phan An'],
        ['laoxiong']
      ]
    },
    commitMessageFilters: [
      /^Merge pull request/,
      /^Merge branch/,
      /\d+/,
      'and', 'the', 'for', 'from', 'with', 'not', 'has', 'when', 'where', 'merge', 'branch',
      function(word) { return word.length <= 2; }
    ],
    layerGroups: {
      'main': [
        { name: 'test', paths: ['test/'] },
        { name: 'src', paths: ['src/'] },
      ]  }
  }
);

gulp.task('all', [
  'hotspot-analysis',
  'knowledge-map-analysis',
  'developer-effort-analysis',
  'sum-of-coupling-analysis',
  'developer-coupling-analysis',
  'commit-message-analysis',
  //'system-evolution-analysis',
  ],
  function() {
  // Sample: gulp all --dateFrom=2010-10-10
});

gulp.task('file', [
   'sloc-trend-analysis',
   'javascript-complexity-trend-analysis',
  //'temporal-coupling-analysis'
  ],
  function() {
  // Sample: gulp file --targetFile=./src/core/vdom/patch.js [--timeSplit=eom]
  // temporal-coupling-analysis is not working
});
