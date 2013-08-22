define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'models/count-model',
    'collections/count-collection',
    'collections/topic-collection',
    'collections/selector-collection',
    'collections/channel-collection',
    'models/selector-model',
    'views/pie-view',
    'views/topics-composite-view',
    'views/subscriptions-layout',
    'views/selector-tabs-collection-view',
    'callbacks/show-stats-callback',
    'callbacks/show-charts-callback',
    'callbacks/get-counts-for-topic-callback',
    'callbacks/get-counts-for-topic-date-callback',
    'marionette',
    'templates'

], function ($, _, Backbone, App,
             CountModel, CountCollection,
             TopicCollection,
             SelectorCollection, ChannelCollection,
             SelectorModel,
             PieView,
             TopicsCompositeView,
             SubscriptionsLayout, SelectorTabsCollectionView,
             showStatsCallback, showChartsCallback, getCountsForTopicCallback, getCountsForTopicAndDateCallback
    ) {

    var SubscriptionController = Backbone.Marionette.Controller.extend({

        subscriptionsForSelector: function(selectorType) {

            console.log(selectorType);

        }

    });

    return SubscriptionController;

});