const rule = require('../../../lib/rules/ng-directive-template-naming');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
const errors = [{ messageId: 'unexpected' }];

ruleTester.run('ng-directive-template-naming', rule, {
    valid: [
        {
            code: '(function () {\n' +
                '    \'use strict\';\n' +
                '    angular\n' +
                '        .module(\'app.directives\')\n' +
                '        .directive(\'ohrmForm\', ohrmForm);\n' +
                '\n' +
                '    /* @ngInject */\n' +
                '    function ohrmForm() {\n' +
                '        return {\n' +
                '            restrict: \'E\',\n' +
                '            scope: {schema: "=schema", form: "=form", model: "=model", name: "=ohrmformname"},\n' +
                '        };\n' +
                '    }\n' +
                '\n' +
                '})();\n',
            errors
        }/*,
        {
            code: 'yup.someOtherCommand()',
            errors,
        },*/
    ],
    invalid: [
        {
            code: '(function () {\n' +
                '    \'use strict\';\n' +
                '    angular\n' +
                '        .module(\'app.directives\')\n' +
                '        .directive(\'ohrmForm\', ohrmForm);\n' +
                '\n' +
                '    /* @ngInject */\n' +
                '    function ohrmForm() {\n' +
                '        return {\n' +
                '            restrict: \'E\',\n' +
                '            templateUrl: \'app/directives/form.html\',\n' +
                '            scope: {schema: "=schema", form: "=form", model: "=model", name: "=ohrmformname"},\n' +
                '        };\n' +
                '    }\n' +
                '\n' +
                '})();\n',
            errors
        }
    ],
});