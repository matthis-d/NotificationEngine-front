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

    // A Backbone collection that represents a list of channels
    var ChannelCollection = Backbone.Collection.extend({

        //The base model is Channel
        model: ChannelModel,

        //Define the base url for this collection
        url: function () {
            return config.serverUrl + '/getConfiguration.do';
        },

        //As the response is not directly containing the collection itself,
        //We define which element is actually the collection
        parse: function (response) {
            return response.channels;
        },

        /**
         * Retrieve topics for a given selector
         * @param {Object} selectorModel A backbone model that represents a selector
         * @return {Object} a collection of topics for this topic
         */ 
        getTopicsForSelector: function (selectorModel) {

            //Get the selector type
            var selectorType = selectorModel.getSelectorType(),
                
                // Get all channels that has this selector
                channelsWithThisSelector = this.where({'selectorType': selectorType}),
                
                // Create an empty collection of topics
                topicsForSelector = new TopicCollection();

            //Iterates over retrieved channels to get topics of each channel
            _.each(channelsWithThisSelector, function (channel) {

                var topicName = channel.getTopic(),

                    //Create a topic from the given name in the channel
                    topicModel = new TopicModel({
                        name: topicName
                    });

                //Add it in the colelction
                topicsForSelector.add(topicModel);

            });
            
            //Return all topics for the selector given
            return topicsForSelector;

        }
        
    });

    return ChannelCollection;
});