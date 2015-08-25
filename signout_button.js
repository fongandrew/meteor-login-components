(function() {
  'use strict';

  Template.logoutButton.events({
    'click .js-logout-link': function() {
      var callback = (LoginComponents.signoutCallback ||
                      LoginComponents.logoutCallback);
      Meteor.logout(callback);
    }
  });

})();