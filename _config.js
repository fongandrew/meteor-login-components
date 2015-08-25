/* global LoginComponents: true */
LoginComponents = {
  // Replace in main app code
  loginCallback: function() {},
  signupCallback: function() {},
  logoutCallback: function() {},

  // Show tabs for login UI?
  showTabs: true,

  // Which dialogue to show
  // * login
  // * forgot-pw
  // * sign-up
  mode: new ReactiveVar('login'),

  // Error mode => if true, server errors during login and signup will be
  // passed during to the login and signup callbacks. Errors durin logout
  // are always passed.
  callbackOnErr: false

};
