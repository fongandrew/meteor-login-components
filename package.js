Package.describe({
  name: 'fongandrew:login-components',
  version: '0.1.0',
  summary: 'Standalone login / sign-up templates that\'s easier to compose ' +
           'than accounts-ui-unstyled',
  git: 'https://github.com/fongandrew/meteor-login-components.git'
});

Package.onUse(function(api) {
  'use strict';
  api.versionsFrom('METEOR@1.1.0.2');
  api.use([
    'fongandrew:spacebars-helpers@0.1.0',
    'fongandrew:save-button@0.1.0',
    'fongandrew:instance-vars@0.2.0',
    'reactive-var',
    'templating',
    'underscore'
  ], 'client');
  api.addFiles([
    '_config.js',
    'login_sign_up.html',
    'login_sign_up.js',
    'signout_button.html',
    'signout_button.js'
  ], 'client');
  api.export('LoginComponents', 'client');
});
