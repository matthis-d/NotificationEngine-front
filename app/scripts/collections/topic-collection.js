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

        }

    });

    return TopicCollection;
});