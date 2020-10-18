const utils = require('./../../node_modules/eslint-plugin-angular/rules/utils/utils');
const Components = require('../../node_modules/eslint-plugin-react/lib/util/Components');
const values = require('object.values');
module.exports = {
    meta: {
        docs: {
            description: 'Extract directive and component information'
        },
        schema: [],
        messages: {
            unexpected: 'Extract directive and component information',
        }
    },
    create: Components.detect((context, components) => {

        return {
            CallExpression: function(node) {
                if (utils.isAngularDirectiveDeclaration(node) || utils.isAngularComponentDeclaration(node)) {
                    var name = node.arguments[0].value;
                    if (global.extratedData !== undefined) {
                        global.extratedData.directives.push(convertToKebabCase(name));
                    }
                }
            },
            'Program:exit'() {
                const component = components.list();
                const componentName = getDetectedComponents(component);
                if (global.extratedData !== undefined && componentName.length > 0) {
                    global.extratedData.reactComponents.push(componentName.pop());
                }
            }
        };
    })
}

function convertToKebabCase(string) {
    return string &&
        string
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.toLowerCase())
            .join('-');
}

function getDetectedComponents(list) {
    return values(list).filter((val) => {
        if (val.node.type === 'ClassDeclaration') {
            return true;
        }
        if (
            val.node.type === 'ArrowFunctionExpression'
            && val.node.parent
            && val.node.parent.type === 'VariableDeclarator'
            && val.node.parent.id
        ) {
            return true;
        }
        return false;
    }).map((val) => {
        if (val.node.type === 'ArrowFunctionExpression') return val.node.parent.id.name;
        return val.node.id.name;
    });
}