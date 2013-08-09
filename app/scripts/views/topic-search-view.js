define([
    'underscore',
    'backbone',
    'app',
    'callbacks/get-counts-for-topic-callback',
    'callbacks/show-stats-callback',
    'marionette',
    'typeahead',
    'templates'

], function (_, Backbone, App, getCountsForTopicCallback, showStatsCallback) {

    var TopicSearchView = Backbone.Marionette.ItemView.extend({

        template: 'topic-search',

        events: {
            'click .btn-primary': 'getStatsForTopic'
        },

        getStatsForTopic: function(e) {
            
            console.log('getStatsForTopic()');

            e.preventDefault();

            var topic = this.$el.find('#topics-input').val();

            getCountsForTopicCallback(topic, this.showStatsForTopic);

        },

        showStatsForTopic: function(collection) {
            
            console.log('showStatsForTopic()');

            showStatsCallback(App.topicStatsLayout, 'results', collection);

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