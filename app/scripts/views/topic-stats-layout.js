define([
    'underscore',
    'backbone',
    'marionette',
    'templates'

], function (_, Backbone) {

    var TopicStatsLayout = Backbone.Marionette.Layout.extend({

        template: 'topic-stats-layout',

        regions: {
            search: '#topic-search',
            result: '#topic-results'
        }

    });

    return TopicStatsLayout;


});