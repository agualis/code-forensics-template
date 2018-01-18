var gulp = require('gulp')
var minimist = require('minimist')

let defaultParams = function () {
  addDefaultParam('dateTo', '2018-01-01')
  addDefaultParam('dateFrom', '2017-01-01')
  addDefaultParam('minWordCount', '2')
  // Just used for system-evolution-analysis
  //addDefaultParam('timeSplit', '6m')
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
      rootPath: "[relative or absolute path to my root git folder]",
      includePaths: [
        './src/',
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
      'Locales': [
        ['Nestor Salceda', 'Néstor Salceda'],
        ['Javi Rubio']
      ],
      'Foranos': [
        ['Alberto Gualis', 'Alberto Gualis Giménez'],
        ['Dani Latorre'],
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
      'test': [
        { name: 'Unit Tests', paths: [/_test_\/.*[._]spec\..*/] },
        { name: 'E2E Tests', paths: ['cypress'] }
      ],
      'main': [
        { name: 'components', paths: ['src/components'] },
        { name: 'pages', paths: ['src/pages'] },
        { name: 'vuex', paths: ['src/vuex'] }
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
  'temporal-coupling-analysis'],
  function() {
  // Sample: gulp file --targetFile=./src/vuex/store.js --dateFrom=2010-10-10 --timeSplit=3m
  // temporal-coupling-analysis is not working
});
