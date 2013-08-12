/*global define*/

define([
    'underscore',
    'backbone',
    'models/topic-model'
], function (_, Backbone, TopicModel) {
    'use strict';

    var TopicCollection = Backbone.Collection.extend({
        model: TopicModel,

        url: 'http://localhost:8080/notificationengine-0.0.1-SNAPSHOT/topics.do',

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