define([
    'backbone',
    'marionette'

], function (Backbone) {

    var SubscriptionRouter = Backbone.Marionette.AppRouter.extend({

        appRoutes: {
            'subscriptions/:selectorType': 'subscriptionsForSelector'
        }

    });

    return SubscriptionRouter;

});