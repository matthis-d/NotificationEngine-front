define([
    'underscore',
    'backbone',
    'app',
    'callbacks/get-counts-for-topic-callback',
    'callbacks/get-counts-for-topic-date-callback',
    'callbacks/show-stats-callback',
    'callbacks/show-charts-callback',
    'marionette',
    'typeahead',
    'templates'

], function (_, Backbone, App, getCountsForTopicCallback, getCountsForTopicAndDateCallback, showStatsCallback, showChartsCallback) {

    var TopicSearchView = Backbone.Marionette.ItemView.extend({

        template: 'topic-search',

        triggers: {
            'click .btn-primary': 'topic-search:ok'
        },

        getStatsForTopic: function(e) {

            e.preventDefault();

            var topic = this.$el.find('#topics-input').val();

            getCountsForTopicCallback(topic, this.showStatsForTopic);

            getCountsForTopicAndDateCallback(topic, this.showChartsForTopic);

        },

        showStatsForTopic: function(collection) {

            showStatsCallback(this.layout, 'results', collection);

        },

        showChartsForTopic: function(collections) {

            showChartsCallback(this.layout, 'charts', collections);

        },

        onRender: function() {

            var allTopics = new Array();

            for(var i = 0; i<5; i++) {
                this.collection.each(function(topic){
                    allTopics.push(topic.getParentLevel(i));
                });
            }
            //We use this to remove double identical values
            allTopics = _.uniq(allTopics);

            this.$el.find('#topics-input').typeahead({
                name: 'topics',
                local: allTopics
            });

        }

    });

    return TopicSearchView;

});