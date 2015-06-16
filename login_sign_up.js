
(function() {
  'use strict';

  Template.loginOrSignUp.onCreated(function() {
    this.createVars({
      // Error message to show
      // * "bad-email" - Blank or invalid email address
      // * "bad-password" - Blank or invalid password
      // * "bad-login" - Invalid email / pw combo
      // * "duplicate-email" - Email already in use for sign up
      // * "unknown" - Generic unknown error
      errorMsg: false,

      // Whether save spinner should be going
      saving: false,

      // Whether requested action compelte
      saved: false
    });
  });

  Template.loginOrSignUp.onRendered(function() {
    // Focus on first input element
    this.$('input').first().focus();
  });

  Template.loginOrSignUp.helpers({
    addContext: function() {
      var instance = Template.instance();
      return _.extend(instance.getVars(), {
        mode: LoginComponents.mode.get(),
        showTabs: LoginComponents.showTabs
      }, this);
    }
  });

  Template.loginOrSignUp.events({
    'submit .login': function(e, template) {
      e.preventDefault();
      template.setVar('saved', false);    // Reset save status
      template.setVar('errorMsg', false); // Reset error messages

      var email = $(e.target).find('[name=email]').val().toLowerCase();
      var pass = $(e.target).find('[name=password]').val();

      if (! RE.email.test(email)) {
        template.setVar('errorMsg', 'bad-email');
        return;
      }
      if (! pass) {
        template.setVar('errorMsg', 'bad-password');
        return;
      }

      template.setVar('saving', true);
      Meteor.loginWithPassword(email, pass, function(err) {
        template.setVar('saving', false);
        if (err) {
          template.setVar('errorMsg', 'bad-login');
        } else {
          LoginComponents.loginCallback();
        }
      });
    },

    'submit .sign-up': function(e, template) {
      e.preventDefault();
      template.setVar('saved', false);    // Reset save status
      template.setVar('errorMsg', false); // Reset error messages

      var email = $(e.target).find('[name=email]').val().toLowerCase();
      var pass = $(e.target).find('[name=password]').val();

      if (! RE.email.test(email)) {
        template.setVar('errorMsg', 'bad-email');
        return;
      }
      if (! pass) {
        template.setVar('errorMsg', 'bad-password');
        return;
      }

      template.setVar('saving', true);
      Accounts.createUser({
        email: email,
        password: pass
      }, 
      function(err) {
        template.setVar('saving', false);
        if (err) {
          if (err.error === 403) {
            template.setVar('errorMsg', 'duplicate-email');
          } else {
            template.setVar('errorMsg', 'unknown');
            console.error(err);
          }
        } else {
          LoginComponents.signupCallback();
        }
      });
    },

    'submit .forgot-pw': function(e, template) {
      e.preventDefault();
      template.setVar('saved', false);    // Reset save status
      template.setVar('errorMsg', false); // Reset error messages

      var email = $(e.target).find('[name=email]').val();
      if (! RE.email.test(email)) {
        template.setVar('errorMsg', 'bad-email');
        return;
      }

      template.setVar('saving', true);
      template.setVar('saved', false);
      Accounts.forgotPassword({
        email: email
      }, function(err) {
        template.setVar('saving', false);
        if (err) {
          if (err.error === 403) {
            template.setVar('errorMsg', 'no-email');
          } else {
            template.setVar('errorMsg', 'unknown');
            console.error(err);
          }
        } 
        else {
          template.setVar('saved', true);
        }
      });
    },

    'click .login-link': function(e, template) {
      LoginComponents.mode.set('login');
      template.setVar('saved', false);
      template.setVar('errorMsg', false);
    },

    'click .forgot-pw-link': function(e, template) {
      LoginComponents.mode.set('forgot-pw');
      template.setVar('saved', false);
      template.setVar('errorMsg', false);
    },

    'click .sign-up-link': function(e, template) {
      LoginComponents.mode.set('sign-up');
      template.setVar('saved', false);
      template.setVar('errorMsg', false);
    }
  });

})();