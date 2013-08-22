define([
    'backbone',
    'marionette'

], function (Backbone) {

    var MainRouter = Backbone.Marionette.AppRouter.extend({

        appRoutes: {
            'stats': 'stats',
            'new-raw': 'createRawNotification',
            'subscriptions': 'subscriptions',
            '*page': 'stats'
        }

    });

    return MainRouter;

});