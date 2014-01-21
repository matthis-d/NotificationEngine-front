define([
    'backbone',
    'marionette'

], function (Backbone) {
    'use strict';

    var MainRouter = Backbone.Marionette.AppRouter.extend({

        appRoutes: {
            'stats': 'stats',
            'new-raw': 'createRawNotification',
            'subscriptions': 'subscriptions',
            'sent-notifications': 'sentNotifications',
            'decorated-notifications': 'decoratedNotifications',
            'tokens': 'tokens',
            '*page': 'stats'
        }

    });

    return MainRouter;

});