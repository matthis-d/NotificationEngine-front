/*global define*/

define([
    'underscore',
    'backbone',
    'models/channel-model',
    'models/topic-model',
    'collections/topic-collection',
    'json!configPath/config.json'

], function (_, Backbone, ChannelModel, TopicModel, TopicCollection, config) {
    'use strict';

    var ChannelCollection = Backbone.Collection.extend({

        model: ChannelModel,

        url: function() {
            return config.serverUrl + '/getConfiguration.do';
        },

        parse: function(response) {
            return response.channels;
        },

        getTopicsForSelector: function(selectorModel) {

            var selectorType = selectorModel.getSelectorType();

            var channelsWithThisSelector = this.where({'selectorType': selectorType});

            var topicsForSelector = new TopicCollection();

            _.each(channelsWithThisSelector, function(channel) {

                var topicName = channel.getTopic();

                var topicModel = new TopicModel({
                    name: topicName
                });

                topicsForSelector.add(topicModel);

            });

            return topicsForSelector;

        }
        
    });

    return ChannelCollection;
});