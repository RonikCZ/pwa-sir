Package.describe({
  name: 'accounts-ui-angular-moded',
  summary: 'AngularJS wrapper for Meteor\'s Account-UI package',
  version: '0.0.4',
  documentation: 'README.md',
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.2.0.1');
  api.use('angular:angular@1.4.7', 'client', { weak: true });
  api.use('blaze-html-templates', 'client');

  api.imply('accounts-ui');

  api.addFiles([
    'accounts-ui-angular.js',
    'login-buttons-directive.js'
  ], 'client');
});
