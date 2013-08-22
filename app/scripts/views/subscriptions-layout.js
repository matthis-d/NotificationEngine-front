define([
    'underscore',
    'backbone',
    'marionette',
    'templates'

], function (_, Backbone) {

    var SubscriptionsLayout = Backbone.Marionette.Layout.extend({

        template: 'subscriptions-layout',

        regions: {
            tabTitles: '#tab-title',
            topicsForSelector: '#topics-for-selector',
            countsByTopic: '#counts-by-topic',
            topicRepartition: '#topics-repartition'
        }

    });

    return SubscriptionsLayout;


});