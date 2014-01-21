define([
    'backbone',
    'marionette'

], function (Backbone) {
    'use strict';

    var LoginRouter = Backbone.Marionette.AppRouter.extend({

        appRoutes: {
            'login': 'login',
            'logout': 'logout'
        }

    });

    return LoginRouter;

});