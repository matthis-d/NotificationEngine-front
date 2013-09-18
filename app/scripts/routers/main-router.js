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
            '*page': 'stats'
        }

    });

    return MainRouter;

});