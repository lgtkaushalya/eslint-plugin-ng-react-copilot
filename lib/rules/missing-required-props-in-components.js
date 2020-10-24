const utils = require('./../../node_modules/eslint-plugin-angular/rules/utils/utils');
var fs = require('fs');
const _ = require('lodash')

module.exports = {
    meta: {
        docs: {
            description: 'Replace directive with react component'
        },
        schema: [],
        messages: {
        }
    },
    create: function(context) {
        let isAngularDirective = false;
        return {
            Literal: function(node) {
                let dataFilePath = global.rootPath !== undefined ? global.rootPath : process.cwd();
                dataFilePath = dataFilePath.replace(/\/$/, '') + '/.ng-react-copilot-data/extracted_data.json';
                if (fs.existsSync(dataFilePath)) {
                    const fileData = fs.readFileSync(dataFilePath, 'utf8');
                    const dataObject = JSON.parse(fileData);
                    if (dataObject.directives !== undefined
                        && Array.isArray(dataObject.directives)) {
                        var detectedDirectives = [];
                        dataObject.directives.forEach(function(directive, index) {
                            var sourceCode = context.getSourceCode();
                            const matchingComponentName = _.upperFirst(_.camelCase(directive.charAt(0).toUpperCase() + directive.slice(1) + 'Component'));
                            if (Object.keys(dataObject.reactComponents).includes(matchingComponentName) && sourceCode.getText(node).match('<' + directive)) {
                                detectedDirectives.push({"directive": directive, "message": directive + " => " + directive + "-component"})
                            }
                        });
                        if (detectedDirectives.length > 0) {
                            let message = '';
                            if (detectedDirectives.length == 1) {
                                let directive = detectedDirectives.pop();
                                message = "Replace angular "+ directive.directive +" directive with react " +directive.directive+ "-component";
                            } else {
                                message = "Replace following angular directive(s) with react component(s)";
                                detectedDirectives.forEach(function(directive) {
                                    message = message + "\n" + directive.message;
                                })
                            }

                            context.report({node, message: message});
                        }
                    }
                }
            }
        }
    }
}