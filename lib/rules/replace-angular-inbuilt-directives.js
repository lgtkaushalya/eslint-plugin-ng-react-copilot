module.exports = {
    meta: {
        docs: {
            description: 'Replace Angular inbuilt directives'
        },
        schema: [],
        messages: {
            replaceNgIf: 'Replace ng-if with native conditions. Ex: this.props.showMe ? <button />',
            replaceNgShow: 'Replace ng-show with native conditions. Ex: this.props.showMe ? <button />',
            replaceNgHide: 'Replace ng-hide with native conditions. Ex: this.props.showMe ? <button />',
            replaceNgRepeat: 'Replace ng-repeat with array iterators. Ex: this.props.data.map(function(item) { return <div>{item}</div>\n })',
            replaceNgClass: 'Replace ng-class with native conditions. Ex: className={this.props.isActive? "is-active" : "inactive"}',
            replaceNgMaxLength: 'Replace ng-maxlength with native HTML validations. Ex: <input maxLength="10"/>',
            replaceNgMinLength: 'Replace ng-minlength with native HTML validations. Ex: <input minLength="5"/>',
            replaceNgDisabled: 'Replace ng-disabled with native HTML functionality. Ex: <button disabled=\{condition\} />',
            replaceNgRequired: 'Replace ng-required with native HTML5 validations. Ex: <input required=\{condition\} />',
            replaceNgInit: 'Replace ng-init with component lifecycle methods. Ex: componentDidMount() or componentWillUnmount()',
            replaceNgForm: 'Refactor ng-form usage with HTML native behaviors.',
            replaceNgModel: 'Refactor ng-model usage with component scope.',
            replaceNgClick: 'Replace ng-click usage with onClick behavior.',
            replaceNgSrc: 'Replace ng-src usage with native HTML src behavior.',
            replaceNgAny: 'Refactor the inbuilt angular directive usage with appropriate native bahaviors.',
        }
    },
    create: function(context) {
        return {
            JSXIdentifier: function(node) {
                switch (node.name) {
                    case 'ng-if':
                        context.report({node, messageId: "replaceNgIf"});
                        break;
                    case 'ng-show':
                        context.report({node, messageId: "replaceNgShow"});
                        break;
                    case 'ng-hide':
                        context.report({node, messageId: "replaceNgHide"});
                        break;
                    case 'ng-repeat':
                        context.report({node, messageId: "replaceNgRepeat"});
                        break;
                    case 'ng-class':
                        context.report({node, messageId: "replaceNgClass"});
                        break;
                    case 'ng-maxlength':
                        context.report({node, messageId: "replaceNgMaxLength"});
                        break;
                    case 'ng-minlength':
                        context.report({node, messageId: "replaceNgMinLength"});
                        break;
                    case 'ng-disabled':
                        context.report({node, messageId: "replaceNgDisabled"});
                        break;
                    case 'ng-required':
                        context.report({node, messageId: "replaceNgRequired"});
                        break;
                    case 'ng-init':
                        context.report({node, messageId: "replaceNgInit"});
                        break;
                    case 'ng-form':
                        context.report({node, messageId: "replaceNgForm"});
                        break;
                    case 'ng-model':
                        context.report({node, messageId: "replaceNgModel"});
                        break;
                    case 'ng-click':
                        context.report({node, messageId: "replaceNgClick"});
                        break;
                    case 'ng-src':
                        context.report({node, messageId: "replaceNgSrc"});
                        break;
                    case String(node.name.match(/^ng-.*/)):
                        context.report({node, messageId: "replaceNgAny"});
                        break;
                }
            }
        }
    }
}