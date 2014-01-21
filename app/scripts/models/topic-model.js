/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var TopicModel = Backbone.Model.extend({
        defaults: {
            name: 'topicName'
        },

        getName: function () {
            return this.get('name');
        },

        getLevels: function () {
            var name = this.getName(),
                levels = name.split('.');

            return levels;
        },

        getLevel: function (levelNumber) {

            var levels = this.getLevels(),
                countSubTopics = levels.length,
                result = levels[0];

            if (countSubTopics < levelNumber) {
                result = levels[countSubTopics - 1];

            } else {
                result = levels[levelNumber];
            }

            return result;
        },

        getParentLevel: function (levelNumber) {

            var topics = [],
                i = 0,
                result;

            for (i = 0; i <= levelNumber; i++) {
                
                if (i <= this.getLevels().length) {

                    topics.push(this.getLevel(i));
                }

            }

            //This method is used to remove the undefined or '' values from the array
            topics = _.compact(topics);

            result = topics.join('.');

            return result;

        }

    });

    return TopicModel;
});