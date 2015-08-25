(function() {
  'use strict';

  var emailRegex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+" + 
    "@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?" + 
    "(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");

  // Reactive var for when login button is clicked
  var savingVar = ReactiveVar(false);

  // Reactive function as to whether we're logging in because login button
  // was clicked (as opposed to auto-login)
  LoginComponents.loggingIn = function() {
    return savingVar.get();
  };

  Template.loginOrSignUp.onCreated(function() {
    this.createVars({
      // Error message to show
      // * "bad-email" - Blank or invalid email address
      // * "bad-password" - Blank or invalid password
      // * "bad-login" - Invalid email / pw combo
      // * "duplicate-email" - Email already in use for sign up
      // * "unknown" - Generic unknown error
      errorMsg: false,

      // Whether requested action complete
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
        showTabs: LoginComponents.showTabs,
        saving: savingVar.get()
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

      if (! emailRegex.test(email)) {
        template.setVar('errorMsg', 'bad-email');
        return;
      }
      if (! pass) {
        template.setVar('errorMsg', 'bad-password');
        return;
      }

      savingVar.set(true);
      Meteor.loginWithPassword(email, pass, function(err) {
        savingVar.set(false);
        if (err) {
          template.setVar('errorMsg', 'bad-login');
        }
        if (!err || LoginComponents.callbackOnErr) {
          if (LoginComponents.signinCallback) {
            LoginComponents.signinCallback(err);
          } else {
            LoginComponents.loginCallback(err);
          }
        }
      });
    },

    'submit .sign-up': function(e, template) {
      e.preventDefault();
      template.setVar('saved', false);    // Reset save status
      template.setVar('errorMsg', false); // Reset error messages

      var email = $(e.target).find('[name=email]').val().toLowerCase();
      var pass = $(e.target).find('[name=password]').val();

      if (! emailRegex.test(email)) {
        template.setVar('errorMsg', 'bad-email');
        return;
      }
      if (! pass) {
        template.setVar('errorMsg', 'bad-password');
        return;
      }

      savingVar.set(true);
      Accounts.createUser({
        email: email,
        password: pass
      },
      function(err) {
        savingVar.set(false);
        if (err) {
          if (err.error === 403) {
            template.setVar('errorMsg', 'duplicate-email');
          } else {
            template.setVar('errorMsg', 'unknown');
            console.error(err);
          }
        }
        if (!err || LoginComponents.callbackOnErr) {
          LoginComponents.signupCallback(err);
        }
      });
    },

    'submit .forgot-pw': function(e, template) {
      e.preventDefault();
      template.setVar('saved', false);    // Reset save status
      template.setVar('errorMsg', false); // Reset error messages

      var email = $(e.target).find('[name=email]').val();
      if (! emailRegex.test(email)) {
        template.setVar('errorMsg', 'bad-email');
        return;
      }

      savingVar.set(true);
      template.setVar('saved', false);
      Accounts.forgotPassword({
        email: email
      }, function(err) {
        savingVar.set(false);
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