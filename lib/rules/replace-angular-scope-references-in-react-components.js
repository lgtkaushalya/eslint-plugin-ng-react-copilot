module.exports = {
    meta: {
        docs: {
            description: 'Replace Angular scope references in react components'
        },
        schema: [],
        messages: {
            unexpected: 'Refactor the Angular scope references with props or state variables',
        }
    },
    create: function(context) {
        return {
            Identifier: function(node) {
                if (node.parent.type !== 'MemberExpression') {
                    let ancestors = context.getAncestors(node).reverse();
                    let renderedInsideJsx = false;
                    let isAPropertyOfAnObjectExpression = node.parent.type === 'Property' && node.parent.parent.type === 'ObjectExpression';
                    let isAReservedKeyWord = ['NaN', 'Infinity', 'undefined'].find(keyword => node.name === keyword)
                    let paramsDefined = true;

                    const globalScope = context.getScope();
                    globalScope.through.forEach(ref => {
                        const identifier = ref.identifier;
                        if (identifier.type == 'Identifier' && identifier.name == node.name) {
                            paramsDefined = false;
                        }
                    });

                    ancestors.forEach((ancestor) => {
                        if (ancestor.type === 'JSXExpressionContainer') {
                            renderedInsideJsx = true;
                        }
                    });

                    if (!paramsDefined && renderedInsideJsx
                        && !isAPropertyOfAnObjectExpression && !isAReservedKeyWord) {
                        context.report({node, messageId: "unexpected"});
                    }
                }
            },
            MemberExpression: function(node) {
                if (node.object.type === 'Identifier') {
                    let ancestors = context.getAncestors(node).reverse();
                    let renderedInsideJsx = false;
                    let paramsDefined = true;

                    const globalScope = context.getScope();
                    globalScope.through.forEach(ref => {
                        const identifier = ref.identifier;
                        if (identifier.type == 'Identifier' && identifier.name == node.object.name) {
                            paramsDefined = false;
                        }
                    });

                    ancestors.forEach((ancestor) => {
                        if (ancestor.type === 'JSXExpressionContainer') {
                            renderedInsideJsx = true;
                        }
                    });

                    if (!paramsDefined && renderedInsideJsx) {
                        context.report({node, messageId: "unexpected"});
                    }
                }
            }
        }
    }
}