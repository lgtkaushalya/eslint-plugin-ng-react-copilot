module.exports = {
    rules: {
      "ng-directive-template-naming" : require('./lib/rules/ng-directive-template-naming'),
      "isolate-scope" : require('./lib/rules/isolate-scope'),
      "replace-angular-inbuilt-directives" : require('./lib/rules/replace-angular-inbuilt-directives')
    }
};