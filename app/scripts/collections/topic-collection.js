/*global define*/

define([
    'underscore',
    'backbone',
    'models/topic-model',
    'json!configPath/config.json'

], function (_, Backbone, TopicModel, config) {
    'use strict';

    var TopicCollection = Backbone.Collection.extend({
        model: TopicModel,

        url: function() {
            return config.serverUrl + '/topics.do';
        },

        getMainTopicNames: function() {

            var topics = new Array();

            this.each(function(topicModel) {

                topics.push(topicModel.getLevel(0));

            });

            return _.uniq(topics);

        },

        comparator: function(model) {
            return model.getName();
        },

        getChildTopics: function(parentTopicName) {

            var result = new Backbone.Collection();

            this.each(function(topic) {

                var topicName = topic.getName();

                if(topicName.indexOf(parentTopicName) > -1) {
                    result.add(topic);
                }

            });

            return result;

        }


    });

    //In order to avoid duplicated elements
    TopicCollection.prototype.add = function(topic) {
        var isDupe = this.any(function(_topic) {
            return _topic.getName() === topic.getName();
        });
        if (isDupe) return;
        Backbone.Collection.prototype.add.call(this, topic);

    }

    return TopicCollection;

});