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

        getName: function() {
            return this.get('name');
        },

        getLevels: function() {
            var name = this.getName();
            var levels = name.split('.');

            return levels;
        },

        getLevelNumber: function(levelNumber) {

            var levels = this.getLevels();

            var countSubTopics = levels.length;

            var result = levels[0];

            if(countSubTopics < levelNumber) {
                result = levels[countSubTopics];

            } else {
                result = levels[levelNumber];
            }

            return result;
        }

    });

    return TopicModel;
});