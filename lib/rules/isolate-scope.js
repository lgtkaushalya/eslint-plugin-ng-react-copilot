const utils = require('./../../node_modules/eslint-plugin-angular/rules/utils/utils');

module.exports = {
    meta: {
        docs: {
            description: 'Isolate the directive scope to avoid scope soup'
        },
        schema: [],
        messages: {
            unexpectedTwoWayDataBinding: 'Avoid two-way data binding in directive scope. Use "<" for inputs and "&" for function calls.'
        }
    },
    create: function(context) {
        let isAngularDirective = false;
        return {
            CallExpression: function(node) {
                if (utils.isAngularDirectiveDeclaration(node)  || utils.isAngularComponentDeclaration(node)) {
                    isAngularDirective = true;
                }
            },
            Property: function(node) {
                if (isAngularDirective && node.parent.type == 'ObjectExpression' && node.parent.parent.type == 'Property'
                    && (node.parent.parent.key.name == 'scope' || node.parent.parent.key.name == 'bindings')) {
                    let scopeVariable = node.value.value;
                    if (scopeVariable.charAt(0) == '=') {
                        context.report({node, messageId: "unexpectedTwoWayDataBinding"});
                    }
                }
            }
        }
    }
}