(function() {
  'use strict';

  Template.signoutButton.events({
    'click .js-logout-link': function() {
      Meteor.logout(LoginComponents.logoutCallback);
    }
  });

})();