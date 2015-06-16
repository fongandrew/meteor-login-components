/* global LoginComponents: true */
LoginComponents = {
  // Replace in main app code
  loginCallback: function() {},
  signupCallback: function() {},
  signoutCallback: function() {},

  // Show tabs for login UI?
  showTabs: true,

  // Which dialogue to show
  // * login
  // * forgot-pw
  // * sign-up
  mode: new ReactiveVar('login')
};
