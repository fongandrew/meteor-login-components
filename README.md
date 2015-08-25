#fongandrew:login-components
Standalone login / sign-up Blaze templates that are easier to compose than
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
after logging in, signing up, or signing out:
```
LoginComponents.loginCallback = function() { ... };
LoginComponents.signupCallback = function() { ... };
LoginComponents.logoutCallback = function(error) { ... };
```

By default, the `loginCallback` and the `signupCallback` do not trigger if
there is a server eror during login or signup. The error is instead handled
by template code. You can set `LoginComponents.callbackOnErr` to true if you.
wish the callback to be called with the error (the Blaze template will still
do its own error handling independent of what you do in your callback).

NB: This library also supports using `LoginComponents.signinCallback` and
`LoginComponents.signoutCallback` for backwards-compatability reasons, but the
is to eventually deprecate those callbacks.

By default, the template uses a tab bar at the top to switch between login and
signup modes. You can turn this off with `LoginComponents.showTabs = false`.
If `showTabs` is false, we'll display links at the bottom of the login or
signup page (like accounts-ui-unstyled does).

You can also change which mode is displayed reactively by calling
LoginComponents.mode.set(mode), where mode is 'login', 'forgot-pw', or
'sign-up'.
