define([
    'underscore',
    'backbone',
    'marionette',
    'typeahead',
    'templates'

], function (_, Backbone) {

    var TopicSearchView = Backbone.Marionette.ItemView.extend({

        template: 'topic-search',

        events: {
            'click .btn-primary': 'getStatsForTopic'
        },

        getStatsForTopic: function(e) {

            e.preventDefault();

            //Create the new composite View
            //send the topic name

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