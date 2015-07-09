#fongandrew:login-components
Standalone login / sign-up templates that are easier to compose than 
accounts-ui-unstyled.

Installation
------------
`meteor add fongandrew:login-components`

Usage
-----
Just add `{{> loginOrSignUp}}` to a template you want to use for a simple
password-based authentication.

The `LoginComponents` object contains config options.

Replace these callbacks with functions of your choice to customize behavior
after logging in, signing up, or signing out.
* `LoginComponents.loginCallback`
* `LoginComponents.signupCallback`
* `LoginComponents.signoutCallback`

By default, the template uses a tab bar at the top to switch between login and 
signup modes. You can turn this off with `LoginComponents.showTabs = false`.
If `showTabs` is false, we'll display links at the bottom of the login or 
signup page (like accounts-ui-unstyled does).

You can also change which mode is displayed reactively by calling
LoginComponents.mode.set(mode), where mode is 'login', 'forgot-pw', or 
'sign-up'.
