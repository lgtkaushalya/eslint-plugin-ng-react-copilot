const utils = require('./../../node_modules/eslint-plugin-angular/rules/utils/utils');
const files = require('../util/files');

module.exports = {
    meta: {
        docs: {
            description: 'Validate the directive and template file naming'
        },
        schema: [],
        messages: {
            unexpected: 'Directive and template file names should have same prefix and placed in the same folder'
        }
    },
    create: function(context) {
        let isAngularDirective = false;
        let isDirectiveFunctionIsIdentifier = false;
        let directiveFunctionIsIdentifier;
        let isDirectiveFunctionIsAFunctionalExpression = false;
        return {
            CallExpression: function(node) {
                console.log('fine');
                if (utils.isAngularDirectiveDeclaration(node)) {
                    var name = node.arguments[1].value;
                    isAngularDirective = true;
                    if (node.arguments[1].type == 'Identifier') {
                        isDirectiveFunctionIsIdentifier = true;
                        directiveFunctionIsIdentifier = node.arguments[1].name;
                    } else if (node.arguments[1].type == 'FunctionExpression') {
                        isDirectiveFunctionIsAFunctionalExpression = true;
                    }
                }
            },
            FunctionDeclaration: function(node) {
                if (isDirectiveFunctionIsIdentifier == true && node.id.name == directiveFunctionIsIdentifier) {
                    var sourceCode = context.getSourceCode();
                    if (sourceCode.getText(node).match('templateUrl')) {
                        var directiveFilePath = context.getFilename();
                        let templatePath = directiveFilePath.replace(/\.directive\.js$/, '') + '.html';
                        if (isAngularDirective && !files.fileExists(templatePath)) {
                            context.report({node, messageId: "unexpected"});
                        }
                    }
                }
            }
        }
    }
}