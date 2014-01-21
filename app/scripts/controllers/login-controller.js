define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'views/login-view',
    'marionette',
    'templates'

], function ($, _, Backbone, App, LoginView
    ) {
    'use strict';

    var LoginController = Backbone.Marionette.Controller.extend({


        //Functions associated to a route
        login: function () {

            // Create the login view
            var loginView = new LoginView();

            App.content.show(loginView);
        },

        logout: function () {

            // Delete the token
            if (sessionStorage.getItem('token')) {
                sessionStorage.removeItem('token');
            }

            // Go to the login page
            Backbone.history.navigate('#/login');
        }

    });

    return LoginController;

});