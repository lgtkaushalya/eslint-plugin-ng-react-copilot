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
        let directiveDefinition = null;
        let directiveFunctionIdentifier;
        let isDirectiveFunctionIsAFunctionalExpression = false;
        return {
            CallExpression: function(node) {
                if (utils.isAngularDirectiveDeclaration(node) || utils.isAngularComponentDeclaration(node)) {
                    var name = node.arguments[1].value;
                    isAngularDirective = true;
                    if (node.arguments[1].type == 'Identifier') {
                        directiveDefinition = 'Identifier';
                        directiveFunctionIdentifier = node.arguments[1].name;
                    } else if (node.arguments[1].type == 'FunctionExpression') {
                        directiveDefinition = 'FunctionExpression';
                    } else if (node.arguments[1].type == 'ObjectExpression') {
                        directiveDefinition = 'ObjectExpression';
                        validateTempalte(node);
                    }
                }
            },
            FunctionDeclaration: function(node) {
                if (directiveDefinition == 'Identifier' && node.id.name == directiveFunctionIdentifier) {
                    validateTempalte(node);
                }
            }
        }

        function checkTemplatePath(directiveFilePath) {
            let templatePath = directiveFilePath.replace(/\.directive\.js$/, '');
            templatePath = templatePath.replace(/\.component\.js$/, '');

            let templatePathDefault = templatePath + '.html';
            let templatePathAlternative = templatePath + '.template.html';

            return files.fileExists(templatePathDefault) || files.fileExists(templatePathAlternative);
        }

        function validateTempalte(node) {
            var sourceCode = context.getSourceCode();
            if (sourceCode.getText(node).match('templateUrl')) {
                var directiveFilePath = context.getFilename();
                if (isAngularDirective && !checkTemplatePath(directiveFilePath)) {
                    context.report({node, messageId: "unexpected"});
                }
            }
        }
    }
}