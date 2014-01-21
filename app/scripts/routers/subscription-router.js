define([
    'backbone',
    'marionette'

], function (Backbone) {
    'use strict';

    var SubscriptionRouter = Backbone.Marionette.AppRouter.extend({

        appRoutes: {
            'subscriptions/:selectorType': 'subscriptionsForSelector'
        }
    });

    return SubscriptionRouter;

});