define([
    'underscore',
    'backbone',
    'marionette',
    'templates'

], function (_, Backbone) {

    var AllStatsLayout = Backbone.Marionette.Layout.extend({

        template: 'all-stats-layout',

        regions: {
            counts: '#counts',
            topics: '#topics',
            charts: '#charts',
            topicStats: '#topic-stats'
        }

    });

    return AllStatsLayout;


});