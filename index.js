module.exports = {
    rules: {
      "ng-directive-template-naming" : require('./lib/rules/ng-directive-template-naming'),
      "isolate-scope" : require('./lib/rules/isolate-scope'),
      "replace-angular-inbuilt-directives" : require('./lib/rules/replace-angular-inbuilt-directives'),
      "replace-angular-scope-references-in-react-components" : require('./lib/rules/replace-angular-scope-references-in-react-components'),
      "extract-directive-and-component-information" : require('./lib/rules/extract-directive-and-component-information'),
      "replace-directive-with-react-component" : require('./lib/rules/replace-directive-with-react-component')
    }
};