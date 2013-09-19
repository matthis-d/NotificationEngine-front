define([
    'backbone',
    'marionette'

], function (Backbone) {

    var MainRouter = Backbone.Marionette.AppRouter.extend({

        appRoutes: {
            'stats': 'stats',
            'new-raw': 'createRawNotification',
            'subscriptions': 'subscriptions',
            'sent-notifications': 'sentNotifications',
            'decorated-notifications': 'decoratedNotifications',
            '*page': 'stats'
        }

    });

    return MainRouter;

});